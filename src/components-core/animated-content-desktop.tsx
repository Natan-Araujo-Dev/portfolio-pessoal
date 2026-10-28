import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Mesmo perfil do Animated Content: escala, subida e entrada em sequência.
const SETTINGS = {
	scale: 0.5,
	delay: 0.11,
	stagger: 0.11,
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

export default function AnimatedContentDesktop() {
	useEffect(() => {
		const root = document.documentElement;
		const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
		let context: gsap.Context | undefined;
		let disabled: boolean | undefined;
		let frame = 0;
		let width = window.innerWidth;
		let previousScroll = window.scrollY;
		let direction = 1;
		function trackDirection() {
			const current = window.scrollY;
			if (current !== previousScroll) direction = current > previousScroll ? 1 : -1;
			previousScroll = current;
		}

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
						const row = mount ? 0 : Math.round(layoutTop(target));
						rows.set(row, [...(rows.get(row) ?? []), target]);
					}
					for (const row of rows.values()) {
						// Mede o layout sem transforms; os painéis sticky continuam na mesma posição.
						const start = () => Math.min(
							scene.getBoundingClientRect().top +
							window.scrollY +
							layoutTop(row[0]) -
							layoutTop(container) -
							window.innerHeight,
							ScrollTrigger.maxScroll(window) - window.innerHeight * 0.45 - 2,
						);
						const end = () => {
							const sceneTop = scene.getBoundingClientRect().top + window.scrollY;
							const rowTop = layoutTop(row[0]) - layoutTop(container);
							const rowBottom = Math.max(...row.map(target => layoutTop(target) - layoutTop(container) + target.offsetHeight));
							const header = document.querySelector("header")?.offsetHeight ?? 0;
							const stickyTop = Number.parseFloat(getComputedStyle(container).top);
							const next = scene.nextElementSibling;
							const covered = getComputedStyle(container).position === "sticky" && next && rowBottom + stickyTop > header;
							const exit = covered
								? next.getBoundingClientRect().top + window.scrollY - Math.max(header, stickyTop + rowTop)
								: sceneTop + rowBottom - header;
							return Math.max(start() + 1, Math.min(exit, ScrollTrigger.maxScroll(window) + 1));
						};
						const enter = (trigger: ScrollTrigger) => {
							const animation = trigger.animation as gsap.core.Tween | undefined;
							if (!animation?.vars.startAt) return;
							trackDirection();
							animation.vars.startAt.y = (mobile ? 24 : SETTINGS.distance) * direction;
							animation.invalidate().restart(true);
						};
						gsap.fromTo(
							row,
							{ y: mobile ? 24 : SETTINGS.distance, scale: mobile ? 0.97 : SETTINGS.scale, opacity: 0 },
							{
								y: 0,
								scale: 1,
								opacity: 1,
								ease: "power3.out",
								duration: SETTINGS.duration,
								stagger: SETTINGS.stagger,
								delay: SETTINGS.delay,
								scrollTrigger: {
									trigger: block,
									start,
									end,
									toggleActions: "none reset none reset",
									onEnter: enter,
									onEnterBack: enter,
								},
							},
						);
					}
				}

				for (const panel of document.querySelectorAll<HTMLElement>(
					".scroll-panel",
				)) {
					const scene = panel.parentElement;
					if (!scene) continue;
					for (const block of Array.from(panel.children)) {
						if (block instanceof HTMLElement)
							animate(block, panel, scene, scene.id === "inicio");
					}
				}
				const footer = document.querySelector<HTMLElement>("footer");
				if (footer) {
					for (const block of footer.querySelectorAll<HTMLElement>(
						":scope > div:first-child > *",
					)) {
						animate(block, footer, footer);
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
		window.addEventListener("scroll", trackDirection, { passive: true });
		sync();
		return () => {
			observer.disconnect();
			resizeObserver.disconnect();
			reducedMotion.removeEventListener("change", sync);
			window.removeEventListener("scroll", trackDirection);
			cancelAnimationFrame(frame);
			context?.revert();
		};
	}, []);

	return null;
}
