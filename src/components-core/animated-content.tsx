import useMobile from "../hooks/useMobile";
import { lazy, Suspense, useEffect, useState } from "react";

const AnimatedContentDesktop = lazy(() => import("./animated-content-desktop"));

export default function AnimatedContent() {
	const desktop = !useMobile();
	const [revealed] = useState(() => new WeakSet<HTMLElement>());

	useEffect(() => {
		if (desktop) return;
		const root = document.documentElement;
		const motion = matchMedia("(prefers-reduced-motion: reduce)");
		const targets: HTMLElement[] = [];
		for (const block of document.querySelectorAll<HTMLElement>(".scroll-panel > *")) {
			if (block.hasAttribute("data-scroll-background") || block.classList.contains("animate-bounce")) continue;
			const group = block.closest(".scroll-scene")?.id === "inicio" ||
				(!block.matches("[data-card]") && block.querySelector("[data-card]"));
			targets.push(...(group ? Array.from(block.children).filter((child): child is HTMLElement =>
				child instanceof HTMLElement && !child.querySelector("h1")
			) : [block]));
		}
		const original = new Map(targets.map(target => [target, target.style.opacity]));
		const animations = new Map<HTMLElement, Animation>();
		let disabled: boolean | undefined;
		let lastScroll = window.scrollY;
		let scrollingDown = true;

		function trackDirection() {
			const current = window.scrollY;
			if (current !== lastScroll) scrollingDown = current > lastScroll;
			lastScroll = current;
		}

		const observer = new IntersectionObserver(entries => {
			for (const entry of entries) {
				const target = entry.target as HTMLElement;
				if (!entry.isIntersecting || revealed.has(target)) continue;
				revealed.add(target);
				observer.unobserve(target);
				target.style.opacity = original.get(target) ?? "";
				if (!scrollingDown) continue;
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
				if (!reduced && !revealed.has(target)) {
					target.style.opacity = "0";
					observer.observe(target);
				}
			}
		}
		const accessibility = new MutationObserver(sync);
		accessibility.observe(root, { attributes: true, attributeFilter: ["class"] });
		motion.addEventListener("change", sync);
		window.addEventListener("scroll", trackDirection, { passive: true });
		sync();
		return () => {
			observer.disconnect();
			accessibility.disconnect();
			motion.removeEventListener("change", sync);
			window.removeEventListener("scroll", trackDirection);
			for (const animation of animations.values()) animation.cancel();
			for (const [target, opacity] of original) target.style.opacity = opacity;
		};
	}, [desktop, revealed]);

	return desktop ? <Suspense fallback={null}><AnimatedContentDesktop revealed={revealed} /></Suspense> : null;
}
