import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScroll() {
	useEffect(() => {
		const root = document.documentElement;
		const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
		const desktop = matchMedia("(min-width: 768px) and (pointer: fine)");
		let lenis: Lenis | null = null;

		function sync() {
			const disabled =
				!desktop.matches ||
				reducedMotion.matches ||
				root.matches(".reduced-motion, .middle-scroll");
			if (disabled) {
				lenis?.destroy();
				lenis = null;
			} else if (!lenis) {
				lenis = new Lenis({
					autoRaf: true,
					lerp: 0.085,
					smoothWheel: true,
					syncTouch: false,
					anchors: { duration: 0.55 },
					allowNestedScroll: true,
				});
			}
		}

		const observer = new MutationObserver(sync);
		observer.observe(root, { attributes: true, attributeFilter: ["class"] });
		reducedMotion.addEventListener("change", sync);
		desktop.addEventListener("change", sync);
		sync();
		return () => {
			observer.disconnect();
			reducedMotion.removeEventListener("change", sync);
			desktop.removeEventListener("change", sync);
			lenis?.destroy();
		};
	}, []);

	return null;
}
