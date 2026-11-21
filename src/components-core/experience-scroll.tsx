import { useLayoutEffect, useRef, type ReactNode } from "react";
import "./experience-scroll.css";

export default function ExperienceScroll({ label, children }: { label: string; children: ReactNode }) {
	const region = useRef<HTMLDivElement>(null);
	const content = useRef<HTMLDivElement>(null);
	const track = useRef<HTMLDivElement>(null);
	const thumb = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const scroll = region.current;
		const body = content.current;
		const rail = track.current;
		const handle = thumb.current;
		if (!scroll || !body || !rail || !handle) return;

		const mouse = matchMedia("(pointer: fine)");
		const root = document.documentElement;
		const listeners = new AbortController();
		const { signal } = listeners;
		let drag: { pointerId: number; startY: number; startScroll: number; scale: number } | undefined;

		const stopDrag = () => {
			if (!drag) return;
			const { pointerId } = drag;
			drag = undefined;
			root.removeAttribute("data-experience-scroll-dragging");
			if (handle.hasPointerCapture(pointerId)) handle.releasePointerCapture(pointerId);
		};

		const sync = () => {
			const { clientHeight, scrollHeight, scrollTop } = scroll;
			const distance = scrollHeight - clientHeight;
			const enabled = mouse.matches && distance > 0;
			rail.hidden = !enabled;
			if (!enabled) {
				stopDrag();
				return;
			}

			const height = Math.min(clientHeight, Math.max(24, clientHeight ** 2 / scrollHeight));
			const offset = (clientHeight - height) * scrollTop / distance;
			rail.style.height = `${clientHeight}px`;
			handle.style.height = `${height}px`;
			handle.style.transform = `translateY(${offset}px)`;
		};

		const updatePointer = () => {
			scroll.toggleAttribute("data-custom-scrollbar", mouse.matches);
			sync();
		};

		rail.addEventListener("pointerdown", event => {
			if (!event.isPrimary || event.button !== 0 || event.pointerType !== "mouse") return;
			event.preventDefault();
			scroll.focus({ preventScroll: true });
			const box = handle.getBoundingClientRect();
			if (event.target !== handle) {
				scroll.scrollTop += event.clientY < box.top ? -scroll.clientHeight : scroll.clientHeight;
				return;
			}
			const travel = rail.getBoundingClientRect().height - box.height;
			if (travel <= 0) return;
			handle.setPointerCapture(event.pointerId);
			drag = {
				pointerId: event.pointerId,
				startY: event.clientY,
				startScroll: scroll.scrollTop,
				scale: (scroll.scrollHeight - scroll.clientHeight) / travel,
			};
			root.setAttribute("data-experience-scroll-dragging", "");
		}, { signal });

		handle.addEventListener("pointermove", event => {
			if (!drag || event.pointerId !== drag.pointerId) return;
			scroll.scrollTop = drag.startScroll + (event.clientY - drag.startY) * drag.scale;
		}, { signal });
		handle.addEventListener("lostpointercapture", stopDrag, { signal });
		handle.addEventListener("pointerup", stopDrag, { signal });
		handle.addEventListener("pointercancel", stopDrag, { signal });
		window.addEventListener("blur", stopDrag, { signal });
		scroll.addEventListener("scroll", sync, { passive: true, signal });
		mouse.addEventListener("change", updatePointer, { signal });
		const resize = new ResizeObserver(sync);
		resize.observe(scroll);
		resize.observe(body);
		updatePointer();

		return () => {
			stopDrag();
			resize.disconnect();
			listeners.abort();
		};
	}, []);

	return (
		<div ref={region} className="experience-scroll-content" role="region" aria-label={label} tabIndex={0}>
			<div className="experience-scroll-rail" aria-hidden="true">
				<div ref={track} className="experience-scroll-track" hidden>
					<div ref={thumb} className="experience-scroll-thumb" />
				</div>
			</div>
			<div ref={content}>{children}</div>
		</div>
	);
}
