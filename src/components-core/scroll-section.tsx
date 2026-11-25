import { useLayoutEffect, useRef, type HTMLAttributes } from "react";
import { clipScrollPanel, measureScrollPanel, needsDynamicPanelClip } from "./scroll-section-layout";

export default function ScrollSection({
	id,
	className,
	children,
	overlapTarget,
}: HTMLAttributes<HTMLDivElement> & { overlapTarget?: string }) {
	const panel = useRef<HTMLDivElement>(null);
	useLayoutEffect(() => {
		const element = panel.current;
		const scene = element?.closest<HTMLElement>(".scroll-scene");
		if (!element || !scene) return;

		const measurePanel = () => measureScrollPanel(scene, element);
		const observer = new ResizeObserver(() => {
			measurePanel();
			scheduleClip();
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
		let visible = false;
		let frame = 0;
		const clip = () => {
			frame = 0;
			clipScrollPanel(scene, element);
		};
		function scheduleClip() {
			if (visible && !frame && needsDynamicPanelClip()) frame = requestAnimationFrame(clip);
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
	}, []);

	return (
		<div id={id} className="scroll-scene" data-overlap-target={overlapTarget}>
			<div className="scroll-stage">
				<div ref={panel} className={`scroll-panel ${className ?? ""}`}>
					{children}
				</div>
			</div>
		</div>
	);
}
