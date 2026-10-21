import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Mesmo perfil do Animated Content: escala, subida e entrada em sequência.
const SETTINGS = {
	scale: 0.5,
	delay: 0.2,
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

export default function AnimatedContent() {
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

			context = gsap.context(() => {
				function animate(
					block: HTMLElement,
					container: HTMLElement,
					scene: HTMLElement,
					mount = false,
				) {
					if (
						!block.getClientRects().length ||
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
						gsap.fromTo(
							row,
							{ y: SETTINGS.distance, scale: SETTINGS.scale, opacity: 0 },
							{
								y: 0,
								scale: 1,
								opacity: 1,
								ease: "power3.out",
								duration: SETTINGS.duration,
								stagger: SETTINGS.stagger,
								delay: mount ? SETTINGS.delay : 0,
								scrollTrigger: mount
									? undefined
									: {
											trigger: block,
											start,
											end: () =>
												Math.min(
													start() + window.innerHeight * 0.45,
													ScrollTrigger.maxScroll(window) - 2,
												),
											scrub: true,
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
		sync();
		return () => {
			observer.disconnect();
			resizeObserver.disconnect();
			reducedMotion.removeEventListener("change", sync);
			cancelAnimationFrame(frame);
			context?.revert();
		};
	}, []);

	return null;
}
