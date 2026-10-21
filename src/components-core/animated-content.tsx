import { lazy, Suspense, useEffect, useState } from "react";

const AnimatedContentDesktop = lazy(() => import("./animated-content-desktop"));

export default function AnimatedContent() {
	const [desktop, setDesktop] = useState(() => matchMedia("(min-width: 768px)").matches);

	useEffect(() => {
		const media = matchMedia("(min-width: 768px)");
		const sync = () => setDesktop(media.matches);
		media.addEventListener("change", sync);
		return () => media.removeEventListener("change", sync);
	}, []);

	useEffect(() => {
		if (desktop) return;
		const root = document.documentElement;
		const motion = matchMedia("(prefers-reduced-motion: reduce)");
		const targets: HTMLElement[] = [];
		for (const block of document.querySelectorAll<HTMLElement>(".scroll-panel > *")) {
			if (block.hasAttribute("data-scroll-background") || block.classList.contains("animate-bounce")) continue;
			const group = block.parentElement?.parentElement?.id === "inicio" ||
				(!block.matches("[data-card]") && block.querySelector("[data-card]"));
			targets.push(...(group ? Array.from(block.children).filter((child): child is HTMLElement => child instanceof HTMLElement) : [block]));
		}
		targets.push(...document.querySelectorAll<HTMLElement>("footer > div:first-child > *"));
		const original = new Map(targets.map(target => [target, target.style.opacity]));
		const seen = new Set<HTMLElement>();
		const animations = new Set<Animation>();
		const observer = new IntersectionObserver(entries => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				const target = entry.target as HTMLElement;
				observer.unobserve(target);
				seen.add(target);
				target.style.opacity = original.get(target) ?? "";
				const animation = target.animate([
					{ opacity: 0, transform: "translateY(24px) scale(0.97)" },
					{ opacity: 1, transform: "none" },
				], { duration: 600, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)" });
				animations.add(animation);
				animation.onfinish = () => animations.delete(animation);
			}
		}, { rootMargin: "0px 0px -5% 0px" });

		function sync() {
			observer.disconnect();
			for (const animation of animations) animation.cancel();
			animations.clear();
			const reduced = motion.matches || root.classList.contains("reduced-motion");
			for (const target of targets) {
				target.style.opacity = original.get(target) ?? "";
				if (!reduced && !seen.has(target)) {
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
			for (const animation of animations) animation.cancel();
			for (const [target, opacity] of original) target.style.opacity = opacity;
		};
	}, [desktop]);

	return desktop ? <Suspense fallback={null}><AnimatedContentDesktop /></Suspense> : null;
}
