// Adaptado de React Bits AccordionGallery, por David Haz.
// https://reactbits.dev/components/accordion-gallery
// Licença em accordion-gallery.LICENSE.md.
import { useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { gsap } from "gsap";
import { Maximize, X } from "lucide-react";
import useLanguage from "../hooks/useLanguage";
import "./accordion-gallery.css";

interface GalleryImage {
	image: string;
	label: string;
}

interface AccordionGalleryProps {
	items: readonly GalleryImage[];
	label: string;
	defaultIndex: number;
	gap: number;
	tilt: number;
	radius: number;
	stagger: number;
	expandRatio: number;
	duration: number;
}

function FullscreenImage({ item, closeLabel, onClose }: {
	item: GalleryImage;
	closeLabel: string;
	onClose: () => void;
}) {
	const dialog = useRef<HTMLDialogElement>(null);

	useLayoutEffect(() => {
		const element = dialog.current;
		if (element && !element.open) element.showModal();
	}, []);

	return (
		<dialog ref={dialog} className="ag-fullscreen" aria-label={item.label} data-lenis-prevent onClose={onClose}>
			<img src={item.image} alt={item.label} draggable={false} />
			<button type="button" className="ag-fullscreen__close" aria-label={closeLabel} onClick={() => dialog.current?.close()} autoFocus>
				<X size={24} aria-hidden="true" />
			</button>
		</dialog>
	);
}

export default function AccordionGallery({
	items, label, defaultIndex, gap, tilt, radius, stagger, expandRatio, duration,
}: AccordionGalleryProps) {
	const { t } = useLanguage();
	const root = useRef<HTMLDivElement>(null);
	const previousActive = useRef(defaultIndex);
	const [active, setActive] = useState(defaultIndex);
	const [fullscreenImage, setFullscreenImage] = useState<GalleryImage | null>(null);
	const count = items.length;
	const ratio = Math.min(Math.max(expandRatio, 0.2), 0.9);
	const expandedGrow = count > 1 ? (ratio * (count - 1)) / (1 - ratio) : 1;

	useLayoutEffect(() => {
		const gallery = root.current;
		if (!gallery) return;
		const measure = () => {
			const vertical = getComputedStyle(gallery).flexDirection === "column";
			const size = vertical ? gallery.clientHeight : gallery.clientWidth;
			const usable = Math.max(size - gap * (count - 1), 120);
			gallery.style.setProperty("--ag-media-size", `${Math.max(140, usable * ratio * 1.22)}px`);
		};
		const observer = new ResizeObserver(measure);
		observer.observe(gallery);
		measure();
		return () => observer.disconnect();
	}, [count, gap, ratio]);

	useLayoutEffect(() => {
		const gallery = root.current;
		if (!gallery) return;
		const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches ||
			document.documentElement.classList.contains("reduced-motion");
		const time = previousActive.current !== active && !reduced ? duration : 0;
		previousActive.current = active;
		const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
		Array.from(gallery.children).forEach((panel, index) => {
			const selected = index === active;
			const media = panel.querySelector(".ag-panel__media");
			const caption = panel.querySelector(".ag-panel__label");
			const drift = Math.max(-1.5, Math.min(1.5, active - index)) * 3;

			timeline.to(panel, {
				flexGrow: selected ? expandedGrow : 1,
				rotateY: selected ? 0 : index < active ? tilt : -tilt,
				"--ag-dim": selected ? 0 : 0.35,
				duration: time,
			}, 0);
			timeline.to(media, {
				"--ag-drift": `${selected ? 0 : drift}%`,
				"--ag-gray": selected ? 0 : 1,
				duration: time,
			}, 0);
			timeline.to(Array.from(caption?.children ?? []), {
				opacity: selected ? 1 : 0,
				x: selected ? 0 : -14,
				duration: selected ? time : time * 0.6,
				stagger: time ? stagger : 0,
			}, 0);
		});
		return () => { timeline.kill(); };
	}, [active, duration, expandedGrow, stagger, tilt]);

	function moveFocus(index: number, event: KeyboardEvent<HTMLButtonElement>) {
		const advance = event.key === "ArrowRight" || event.key === "ArrowDown";
		const retreat = event.key === "ArrowLeft" || event.key === "ArrowUp";
		if (!advance && !retreat) return;
		event.preventDefault();
		const next = (index + (advance ? 1 : count - 1)) % count;
		root.current?.querySelectorAll<HTMLButtonElement>(".ag-panel")[next]?.focus();
	}

	return (
		<>
			<div
				ref={root}
				className="accordion-gallery"
				style={{ "--ag-gap": `${gap}px`, "--ag-radius": `${radius}px` } as CSSProperties}
				role="group"
				aria-label={label}
			>
				{items.map((item, index) => (
					<button
						key={item.image}
						type="button"
						className="ag-panel"
						aria-haspopup="dialog"
						aria-label={t("Ver {image} em tela cheia", { image: item.label })}
						onPointerEnter={event => { if (event.pointerType === "mouse") setActive(index); }}
						onFocus={() => setActive(index)}
						onClick={() => {
							setActive(index);
							setFullscreenImage(item);
						}}
						onKeyDown={event => moveFocus(index, event)}
					>
						<span className="ag-panel__media">
							<img src={item.image} alt="" decoding="async" loading="lazy" draggable={false} />
						</span>
						<span className="ag-panel__overlay" aria-hidden="true" />
						<span className="ag-panel__label" aria-hidden="true">
							<span className="ag-panel__bar" />
							<span className="ag-panel__text">{item.label}</span>
						</span>
						{index === active && (
							<span className="ag-panel__maximize" aria-hidden="true"><Maximize size={18} /></span>
						)}
					</button>
				))}
			</div>
			{fullscreenImage && (
				<FullscreenImage item={fullscreenImage} closeLabel={t("Fechar tela cheia")} onClose={() => setFullscreenImage(null)} />
			)}
		</>
	);
}
