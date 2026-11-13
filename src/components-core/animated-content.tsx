import useMobile from "../hooks/useMobile";
import { lazy, Suspense, useEffect } from "react";

const AnimatedContentDesktop = lazy(() => import("./animated-content-desktop"));

export default function AnimatedContent() {
	const desktop = !useMobile();

	useEffect(() => {
		if (desktop) return;
		const root = document.documentElement;
		const motion = matchMedia("(prefers-reduced-motion: reduce)");
		const targets: HTMLElement[] = [];
		for (const block of document.querySelectorAll<HTMLElement>(".scroll-panel > *")) {
			if (block.hasAttribute("data-scroll-background") || block.classList.contains("animate-bounce")) continue;
			const group = block.parentElement?.parentElement?.id === "inicio" ||
				(!block.matches("[data-card]") && block.querySelector("[data-card]"));
			targets.push(...(group ? Array.from(block.children).filter((child): child is HTMLElement =>
				child instanceof HTMLElement && !child.querySelector("h1")
			) : [block]));
		}
		targets.push(...document.querySelectorAll<HTMLElement>("footer > div:first-child > *"));
		const original = new Map(targets.map(target => [target, target.style.opacity]));
		const animations = new Map<HTMLElement, Animation>();
		const visible = new Set<HTMLElement>();
		let disabled: boolean | undefined;
		const observer = new IntersectionObserver(entries => {
			for (const entry of entries) {
				const target = entry.target as HTMLElement;
				if (!entry.isIntersecting || visible.has(target)) continue;
				visible.add(target);
				// O próprio deslocamento da animação não deve disparar uma saída.
				observer.unobserve(target);
				target.style.opacity = original.get(target) ?? "";
				const animation = target.animate([
					{ opacity: 0, transform: "translateY(24px) scale(0.97)" },
					{ opacity: 1, transform: "none" },
				], { duration: 600, delay: 110, fill: "backwards", easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" });
				animations.set(target, animation);
				animation.onfinish = () => {
					animations.delete(target);
				};
			}
		}, { rootMargin: "0px 0px -5% 0px" });

		function sync() {
			const reduced = motion.matches || root.classList.contains("reduced-motion");
			if (disabled === reduced) return;
			disabled = reduced;
			observer.disconnect();
			for (const animation of animations.values()) animation.cancel();
			animations.clear();
			for (const target of targets) {
				target.style.opacity = original.get(target) ?? "";
				if (!reduced && !visible.has(target)) {
					target.style.opacity = "0";
					observer.observe(target);
				}
			}
		}
		const accessibility = new MutationObserver(sync);
		accessibility.observe(root, { attributes: true, attributeFilter: ["class"] });
		motion.addEventListener("change", sync);
		sync();
		return () => {
			observer.disconnect();
			accessibility.disconnect();
			motion.removeEventListener("change", sync);
			for (const animation of animations.values()) animation.cancel();
			for (const [target, opacity] of original) target.style.opacity = opacity;
		};
	}, [desktop]);

	return desktop ? <Suspense fallback={null}><AnimatedContentDesktop /></Suspense> : null;
}
