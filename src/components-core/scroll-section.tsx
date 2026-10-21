import { useEffect, useRef, type HTMLAttributes } from "react";

export default function ScrollSection({
	id,
	className,
	children,
}: HTMLAttributes<HTMLDivElement>) {
	const panel = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = panel.current;
		if (!element) return;
		let frame = 0;
		function clip() {
			frame = 0;
			if (!element) return;
			const next = element.parentElement?.nextElementSibling;
			const bottom = next
				? element.getBoundingClientRect().bottom -
					next.getBoundingClientRect().top
				: -80;
			// Recorta somente o conteúdo coberto, mantendo o canvas visível atrás.
			element.style.setProperty(
				"--covered-bottom",
				`${bottom > 0 ? bottom : -80}px`,
			);
		}
		function scheduleClip() {
			if (!frame) frame = requestAnimationFrame(clip);
		}
		function resize() {
			if (!element) return;
			// Seções longas só ficam fixas quando seu fim chega à tela.
			element.parentElement?.style.setProperty(
				"--panel-height",
				`${element.offsetHeight}px`,
			);
			scheduleClip();
		}
		const observer = new ResizeObserver(resize);
		observer.observe(element);
		const rootObserver = new MutationObserver(scheduleClip);
		rootObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class", "style"],
		});
		window.addEventListener("scroll", scheduleClip, { passive: true });
		window.addEventListener("resize", resize);
		resize();
		return () => {
			observer.disconnect();
			rootObserver.disconnect();
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", scheduleClip);
			window.removeEventListener("resize", resize);
		};
	}, []);

	return (
		<div id={id} className="scroll-scene">
			<div ref={panel} className={`scroll-panel ${className ?? ""}`}>
				{children}
			</div>
		</div>
	);
}
