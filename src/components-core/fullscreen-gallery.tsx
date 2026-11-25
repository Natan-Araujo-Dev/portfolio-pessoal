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
	const photo = useRef<HTMLImageElement>(null);
	const pressedOutside = useRef(false);
	const drag = useRef<{ id: number; x: number; y: number } | null>(null);
	const [index, setIndex] = useState(initialIndex);
	const [dragOffset, setDragOffset] = useState(0);
	const item = items[index];
	const hasMultiplePhotos = items.length > 1;

	useLayoutEffect(() => {
		const element = dialog.current;
		if (element && !element.open) element.showModal();
	}, []);

	function navigate(direction: -1 | 1) {
		setIndex(current => (current + direction + items.length) % items.length);
	}

	function startDrag(event: PointerEvent<HTMLDivElement>) {
		if (!hasMultiplePhotos || !event.isPrimary || event.button !== 0) return;
		if (!photo.current || !containsPhotoPoint(photo.current, event.clientX, event.clientY)) return;
		drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
		event.currentTarget.setPointerCapture(event.pointerId);
	}

	function moveDrag(event: PointerEvent<HTMLDivElement>) {
		const start = drag.current;
		if (!start || event.pointerId !== start.id) return;
		const dx = event.clientX - start.x;
		const dy = event.clientY - start.y;
		setDragOffset(Math.abs(dx) > Math.abs(dy) ? Math.max(-72, Math.min(72, dx)) : 0);
	}

	function resetDrag(event: PointerEvent<HTMLDivElement>) {
		if (drag.current?.id !== event.pointerId) return;
		drag.current = null;
		setDragOffset(0);
	}

	function finishDrag(event: PointerEvent<HTMLDivElement>) {
		const start = drag.current;
		if (!start || event.pointerId !== start.id) return;
		const dx = event.clientX - start.x;
		const dy = event.clientY - start.y;
		resetDrag(event);
		const threshold = Math.min(60, event.currentTarget.clientWidth * 0.2);
		if (Math.abs(dx) >= threshold && Math.abs(dx) > Math.abs(dy)) {
			navigate(dx < 0 ? 1 : -1);
		}
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
				<img ref={photo} src={item.image} alt={item.label} draggable={false} style={{ translate: `${dragOffset}px` }} />
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
