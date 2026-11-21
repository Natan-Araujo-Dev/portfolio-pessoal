import useMobile from "../hooks/useMobile";
import { useLayoutEffect, useRef, type HTMLAttributes } from "react";

export default function ScrollSection({
	id,
	className,
	children,
}: HTMLAttributes<HTMLDivElement>) {
	const mobile = useMobile();
	const panel = useRef<HTMLDivElement>(null);
	useLayoutEffect(() => {
		const element = panel.current;
		const scene = element?.parentElement;
		if (!element || !scene) return;

		const measurePanel = () => {
			const panelHeight = element.offsetHeight;
			const viewportHeight = Math.round(Number.parseFloat(getComputedStyle(element).minHeight));
			scene.style.setProperty("--panel-height", `${panelHeight}px`);
			scene.toggleAttribute("data-scroll-tall", panelHeight > viewportHeight);
		};
		const observer = new ResizeObserver(() => {
			measurePanel();
			if (!mobile) scheduleClip();
		});
		observer.observe(element);
		window.addEventListener("resize", measurePanel);
		measurePanel();

		const stopMeasuring = () => {
			observer.disconnect();
			window.removeEventListener("resize", measurePanel);
			scene.style.removeProperty("--panel-height");
			scene.removeAttribute("data-scroll-tall");
		};
		if (mobile) return stopMeasuring;

		let visible = false;
		let frame = 0;
		const clip = () => {
			frame = 0;
			const next = scene.nextElementSibling;
			const bottom = next
				? element.getBoundingClientRect().bottom -
					next.getBoundingClientRect().top
				: -80;
			// Recorta somente o conteúdo coberto, mantendo o canvas visível atrás.
			element.style.setProperty(
				"--covered-bottom",
				`${bottom > 0 ? bottom : -80}px`,
			);
		};
		function scheduleClip() {
			if (visible && !frame) frame = requestAnimationFrame(clip);
		}
		const visibility = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			scheduleClip();
		});
		visibility.observe(scene);
		const rootObserver = new MutationObserver(scheduleClip);
		rootObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class", "style"],
		});
		window.addEventListener("scroll", scheduleClip, { passive: true });
		window.addEventListener("resize", scheduleClip);
		return () => {
			stopMeasuring();
			visibility.disconnect();
			rootObserver.disconnect();
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", scheduleClip);
			window.removeEventListener("resize", scheduleClip);
			element.style.removeProperty("--covered-bottom");
		};
	}, [mobile]);

	return (
		<div id={id} className="scroll-scene">
			<div ref={panel} className={`scroll-panel ${className ?? ""}`}>
				{children}
			</div>
		</div>
	);
}
