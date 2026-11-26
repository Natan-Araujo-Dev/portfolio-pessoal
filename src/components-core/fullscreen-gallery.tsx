import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import useLanguage from "../hooks/useLanguage";

export interface GalleryImage {
	image: string;
	label: string;
}

interface FullscreenGalleryProps {
	items: readonly GalleryImage[];
	initialIndex: number;
	onClose: () => void;
}

function wrapIndex(index: number, length: number) {
	return (index + length) % length;
}

function slideTransform(offset: number) {
	return `translateX(${offset}px)`;
}

function containsPhotoPoint(image: HTMLImageElement, x: number, y: number) {
	const bounds = image.getBoundingClientRect();
	const scale = image.naturalWidth && image.naturalHeight
		? Math.min(bounds.width / image.naturalWidth, bounds.height / image.naturalHeight)
		: 0;
	const width = scale ? image.naturalWidth * scale : bounds.width;
	const height = scale ? image.naturalHeight * scale : bounds.height;
	return Math.abs(x - (bounds.left + bounds.width / 2)) <= width / 2 &&
		Math.abs(y - (bounds.top + bounds.height / 2)) <= height / 2;
}

export default function FullscreenGallery({ items, initialIndex, onClose }: FullscreenGalleryProps) {
	const { t } = useLanguage();
	const dialog = useRef<HTMLDialogElement>(null);
	const track = useRef<HTMLDivElement>(null);
	const photo = useRef<HTMLImageElement>(null);
	const pressedOutside = useRef(false);
	const drag = useRef<{ id: number; x: number; y: number; width: number; offset: number } | null>(null);
	const settlement = useRef<Animation | null>(null);
	const [index, setIndex] = useState(initialIndex);
	const item = items[index];
	const hasMultiplePhotos = items.length > 1;
	const slides = hasMultiplePhotos
		? [wrapIndex(index - 1, items.length), index, wrapIndex(index + 1, items.length)]
		: [index];

	useLayoutEffect(() => {
		const element = dialog.current;
		if (element && !element.open) element.showModal();
		return () => settlement.current?.cancel();
	}, []);

	useLayoutEffect(() => {
		settlement.current?.cancel();
		settlement.current = null;
		track.current?.style.removeProperty("transform");
	}, [index]);

	function navigate(direction: -1 | 1) {
		if (!drag.current) setIndex(current => wrapIndex(current + direction, items.length));
	}

	function startDrag(event: PointerEvent<HTMLDivElement>) {
		if (!hasMultiplePhotos || drag.current || settlement.current || !event.isPrimary || event.button !== 0) return;
		if (!photo.current || !containsPhotoPoint(photo.current, event.clientX, event.clientY)) return;
		drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, width: event.currentTarget.clientWidth, offset: 0 };
		event.currentTarget.setPointerCapture(event.pointerId);
	}

	function moveDrag(event: PointerEvent<HTMLDivElement>) {
		const start = drag.current;
		if (!start || event.pointerId !== start.id) return;
		const dx = event.clientX - start.x;
		const dy = event.clientY - start.y;
		start.offset = Math.abs(dx) > Math.abs(dy) ? Math.max(-start.width, Math.min(start.width, dx)) : 0;
		if (track.current) track.current.style.transform = slideTransform(start.offset);
	}

	function resetDrag(event: PointerEvent<HTMLDivElement>) {
		if (drag.current?.id !== event.pointerId) return;
		drag.current = null;
		track.current?.style.removeProperty("transform");
	}

	function finishDrag(event: PointerEvent<HTMLDivElement>) {
		const start = drag.current;
		const element = track.current;
		if (!start || event.pointerId !== start.id || !element) return;
		drag.current = null;
		const dx = event.clientX - start.x;
		const dy = event.clientY - start.y;
		const threshold = Math.min(60, start.width * 0.2);
		const direction = Math.abs(dx) >= threshold && Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? 1 : -1) : 0;
		const destination = -direction * start.width;
		const complete = () => {
			if (direction) {
				navigate(direction);
			} else {
				settlement.current?.cancel();
				settlement.current = null;
				element.style.removeProperty("transform");
			}
		};
		const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches ||
			document.documentElement.classList.contains("reduced-motion");
		if (start.offset === destination || reduced) {
			complete();
			return;
		}

		const transition = element.animate([
			{ transform: slideTransform(start.offset) },
			{ transform: slideTransform(destination) },
		], { duration: 220, easing: "cubic-bezier(.22, 1, .36, 1)", fill: "forwards" });
		settlement.current = transition;
		transition.onfinish = () => { if (settlement.current === transition) complete(); };
	}

	function isOutsidePhoto(event: { target: EventTarget | null; clientX: number; clientY: number }) {
		return !(event.target instanceof Element && event.target.closest("button")) &&
			photo.current !== null &&
			!containsPhotoPoint(photo.current, event.clientX, event.clientY);
	}

	return (
		<dialog
			ref={dialog}
			className="ag-fullscreen"
			aria-label={item.label}
			data-lenis-prevent
			onClose={onClose}
			onPointerDownCapture={event => {
				if (event.isPrimary) pressedOutside.current = event.button === 0 && isOutsidePhoto(event);
			}}
			onPointerCancelCapture={() => { pressedOutside.current = false; }}
			onClick={event => {
				const startedOutside = pressedOutside.current;
				pressedOutside.current = false;
				if (startedOutside && isOutsidePhoto(event)) event.currentTarget.close();
			}}
			onKeyDown={event => {
				if (!hasMultiplePhotos || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
				event.preventDefault();
				navigate(event.key === "ArrowLeft" ? -1 : 1);
			}}
		>
			<div
				className="ag-fullscreen__media"
				data-draggable={hasMultiplePhotos || undefined}
				onPointerDown={startDrag}
				onPointerMove={moveDrag}
				onPointerUp={finishDrag}
				onPointerCancel={resetDrag}
				onLostPointerCapture={resetDrag}
			>
				<div ref={track} className="ag-fullscreen__track" data-neighbors={hasMultiplePhotos || undefined}>
					{slides.map((position, slot) => {
						const slide = items[position];
						const isCurrent = position === index;
						const key = slot === 2 && position === slides[0] ? `duplicate-${position}` : position;
						return (
							<img key={key} ref={isCurrent ? photo : undefined} src={slide.image}
								alt={isCurrent ? slide.label : ""} aria-hidden={!isCurrent || undefined} draggable={false} />
						);
					})}
				</div>
			</div>
			<button type="button" className="ag-fullscreen__close" aria-label={t("Fechar tela cheia")} onClick={() => dialog.current?.close()} autoFocus>
				<X size={28} aria-hidden="true" />
			</button>
			{hasMultiplePhotos && (
				<>
					<button type="button" className="ag-fullscreen__nav ag-fullscreen__nav--previous" aria-label={t("Imagem anterior")} onClick={() => navigate(-1)}>
						<ChevronLeft size={28} aria-hidden="true" />
					</button>
					<button type="button" className="ag-fullscreen__nav ag-fullscreen__nav--next" aria-label={t("Próxima imagem")} onClick={() => navigate(1)}>
						<ChevronRight size={28} aria-hidden="true" />
					</button>
					<div className="ag-fullscreen__dots" aria-hidden="true">
						{items.map((photo, position) => (
							<span key={photo.image} data-current={position === index || undefined} />
						))}
					</div>
					<span className="sr-only" role="status">
						{t("Imagem {current} de {total}", { current: String(index + 1), total: String(items.length) })} — {item.label}
					</span>
				</>
			)}
		</dialog>
	);
}
