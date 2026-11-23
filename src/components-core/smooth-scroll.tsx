import { useEffect } from "react";
import type Lenis from "lenis";
import { programmaticScroll, setSmoothScroller } from "./smooth-scroll-controller";
import "lenis/dist/lenis.css";

export default function SmoothScroll() {
	useEffect(() => {
		const root = document.documentElement;
		const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
		const desktop = matchMedia("(min-width: 768px) and (pointer: fine)");
		let lenis: Lenis | null = null;
		let loading = false;
		let disposed = false;
		const isDisabled = () => !desktop.matches || reducedMotion.matches ||
			root.matches(".reduced-motion, .middle-scroll");

		function destroyScroller() {
			lenis?.destroy();
			lenis = null;
			setSmoothScroller(null);
		}

		async function sync() {
			if (isDisabled()) {
				destroyScroller();
			} else if (!lenis && !loading) {
				loading = true;
				const { default: Lenis } = await import("lenis");
				loading = false;
				if (disposed || isDisabled()) return;
				lenis = new Lenis({
					autoRaf: true,
					lerp: 0.085,
					smoothWheel: true,
					syncTouch: false,
					anchors: { duration: 0.55 },
					allowNestedScroll: true,
					virtualScroll: ({ event }) => {
						if (!programmaticScroll || !(event instanceof WheelEvent) || event.ctrlKey) return true;
						event.preventDefault();
						return false;
					},
				});
				setSmoothScroller(lenis);
			}
		}

		const observer = new MutationObserver(sync);
		observer.observe(root, { attributes: true, attributeFilter: ["class"] });
		reducedMotion.addEventListener("change", sync);
		desktop.addEventListener("change", sync);
		sync();
		return () => {
			disposed = true;
			observer.disconnect();
			reducedMotion.removeEventListener("change", sync);
			desktop.removeEventListener("change", sync);
			destroyScroller();
		};
	}, []);

	return null;
}
