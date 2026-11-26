import { useEffect, useRef } from "react";
import darkVideo from "../assets/experience-laser/mobile-dark.mp4";
import lightVideo from "../assets/experience-laser/mobile-light.mp4";

export default function ExperienceLaserVideo() {
	const video = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const element = video.current;
		if (!element) return;

		const root = document.documentElement;
		const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
		let visible = false;

		const sync = () => {
			if (document.hidden || motion.matches || root.matches(".reduced-motion, .high-contrast")) {
				element.pause();
				return;
			}

			const source = root.classList.contains("dark") ? darkVideo : lightVideo;
			const sourceChanged = element.getAttribute("src") !== source;
			if (sourceChanged) element.src = source;

			if (!visible) {
				element.pause();
			} else if (sourceChanged || element.paused) {
				// A reprodução automática pode ser bloqueada pelo navegador.
				void element.play().catch(() => {});
			}
		};

		const visibleThreshold = 0.001;
		const visibility = new IntersectionObserver(([entry]) => {
			visible = entry.intersectionRatio >= visibleThreshold;
			sync();
		}, { threshold: visibleThreshold });
		const preferences = new MutationObserver(sync);

		visibility.observe(element);
		preferences.observe(root, { attributes: true, attributeFilter: ["class"] });
		motion.addEventListener("change", sync);
		document.addEventListener("visibilitychange", sync);
		const preloadFrame = requestAnimationFrame(sync);

		return () => {
			cancelAnimationFrame(preloadFrame);
			visibility.disconnect();
			preferences.disconnect();
			motion.removeEventListener("change", sync);
			document.removeEventListener("visibilitychange", sync);
			element.pause();
			if (element.hasAttribute("src")) {
				element.removeAttribute("src");
				element.load();
			}
		};
	}, []);

	return <video ref={video} className="block h-full w-full object-fill" muted loop playsInline preload="auto" />;
}
