import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getNextScrollSection } from "./scroll-section-target";

gsap.registerPlugin(ScrollTrigger);

// As entradas mantêm a escala e o deslocamento vertical.
const SETTINGS = {
	scale: 0.5,
	duration: 0.6,
	distance: 100,
};

function layoutTop(element: HTMLElement | null): number {
	let top = 0;
	for (
		let current = element;
		current;
		current = current.offsetParent as HTMLElement | null
	) {
		top += current.offsetTop;
	}
	return top;
}

export default function AnimatedContentDesktop({ revealed }: { revealed: WeakSet<HTMLElement> }) {
	useEffect(() => {
		const root = document.documentElement;
		const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
		let context: gsap.Context | undefined;
		let disabled: boolean | undefined;
		let frame = 0;
		let width = window.innerWidth;
		function refresh() {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => ScrollTrigger.refresh());
		}

		function sync() {
			const reduce =
				reducedMotion.matches || root.classList.contains("reduced-motion");
			if (disabled === reduce) {
				refresh();
				return;
			}
			disabled = reduce;
			context?.revert();
			if (reduce) return;
			const mobile = window.innerWidth < 768;

			context = gsap.context(() => {
				function animate(
					block: HTMLElement,
					container: HTMLElement,
					scene: HTMLElement,
					mount = false,
				) {
					if (
						!block.getClientRects().length ||
						block.hasAttribute("data-scroll-background") ||
						block.classList.contains("animate-bounce")
					)
						return;
					const children = Array.from(block.children).filter(
						(child): child is HTMLElement =>
							child instanceof HTMLElement &&
							!child.classList.contains("animate-bounce"),
					);
					const targets =
						mount || (!block.matches("[data-card]") && block.querySelector("[data-card]")) ? children : [block];
					if (!targets.length) return;
					const rows = new Map<number, HTMLElement[]>();
					for (const target of targets) {
						if (revealed.has(target)) continue;
						const row = mount ? 0 : Math.round(layoutTop(target));
						rows.set(row, [...(rows.get(row) ?? []), target]);
					}
					for (const row of rows.values()) {
						// Mede o layout sem transforms; os painéis sticky continuam na mesma posição.
						const pause = () => {
							const reserve = getNextScrollSection(scene) ? container.parentElement : scene;
							return (reserve?.offsetHeight ?? container.offsetHeight) - container.offsetHeight;
						};
						const start = () => {
							const sceneTop = scene.getBoundingClientRect().top + window.scrollY;
							const entryOffset = layoutTop(row[0]) - layoutTop(container) - window.innerHeight;
							const hold = scene.hasAttribute("data-scroll-tall") && entryOffset >= 0 ? pause() : 0;
							return Math.min(sceneTop + entryOffset + hold, ScrollTrigger.maxScroll(window) - window.innerHeight * 0.45 - 2);
						};
						const end = () => {
							const sceneTop = scene.getBoundingClientRect().top + window.scrollY;
							const rowTop = layoutTop(row[0]) - layoutTop(container);
							const rowBottom = Math.max(...row.map(target => layoutTop(target) - layoutTop(container) + target.offsetHeight));
							const header = document.querySelector("header")?.offsetHeight ?? 0;
							const stickyTop = Math.min(0, window.innerHeight - container.offsetHeight);
							const next = getNextScrollSection(scene);
							const tall = scene.hasAttribute("data-scroll-tall");
							const covered = next && rowBottom + stickyTop > header;
							const hold = tall || !next ? pause() : 0;
							const exit = covered
								? next.getBoundingClientRect().top + window.scrollY - Math.max(header, stickyTop + rowTop)
								: sceneTop + rowBottom + hold - header;
							return Math.max(start() + 1, Math.min(exit, ScrollTrigger.maxScroll(window) + 1));
						};
						const reveal = (trigger: ScrollTrigger, animate: boolean) => {
							if (row.every(target => revealed.has(target))) return;
							for (const target of row) revealed.add(target);
							if (animate) trigger.animation?.restart(true);
							else trigger.animation?.progress(1).pause();
						};
						const focus = block.hasAttribute("data-focus-reveal");
						gsap.fromTo(
							row,
							{ y: mobile ? 24 : SETTINGS.distance, scale: mobile ? 0.97 : SETTINGS.scale, opacity: 0, ...(focus ? { filter: "blur(6px)" } : {}) },
							{
								y: 0,
								scale: 1,
								opacity: 1,
								...(focus ? { filter: "blur(0px)" } : {}),
								ease: "power3.out",
								duration: SETTINGS.duration,
								scrollTrigger: {
									trigger: block,
									start,
									end,
									once: true,
									toggleActions: "none none none none",
									onEnter: trigger => reveal(trigger, true),
									onEnterBack: trigger => reveal(trigger, false),
								},
							},
						);
					}
				}

				for (const panel of document.querySelectorAll<HTMLElement>(
					".scroll-panel",
				)) {
					const scene = panel.closest<HTMLElement>(".scroll-scene");
					if (!scene) continue;
					for (const block of Array.from(panel.children)) {
						if (block instanceof HTMLElement)
							animate(block, panel, scene, scene.id === "inicio");
					}
				}
			});
			refresh();
		}

		const resizeObserver = new ResizeObserver(() => {
			if (width !== window.innerWidth) {
				width = window.innerWidth;
				disabled = undefined;
				sync();
			} else refresh();
		});
		for (const element of document.querySelectorAll(".scroll-panel, footer"))
			resizeObserver.observe(element);
		const observer = new MutationObserver(sync);
		observer.observe(root, {
			attributes: true,
			attributeFilter: ["class", "style"],
		});
		reducedMotion.addEventListener("change", sync);
		sync();
		return () => {
			observer.disconnect();
			resizeObserver.disconnect();
			reducedMotion.removeEventListener("change", sync);
			cancelAnimationFrame(frame);
			context?.revert();
		};
	}, [revealed]);

	return null;
}
