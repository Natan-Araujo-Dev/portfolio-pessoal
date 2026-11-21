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
		let nearby = false;
		let visible = false;

		const sync = () => {
			if (document.hidden || motion.matches || root.matches(".reduced-motion, .high-contrast")) {
				element.pause();
				return;
			}

			const source = root.classList.contains("dark") ? darkVideo : lightVideo;
			const shouldLoad = (nearby || visible) && element.getAttribute("src") !== source;
			if (shouldLoad) element.src = source;

			if (!visible) {
				element.pause();
			} else if (shouldLoad || element.paused) {
				// A reprodução automática pode ser bloqueada pelo navegador.
				void element.play().catch(() => {});
			}
		};

		const proximity = new IntersectionObserver(([entry]) => {
			nearby = entry.isIntersecting;
			sync();
		}, { rootMargin: "240px 0px" });
		const visibleThreshold = 0.001;
		const visibility = new IntersectionObserver(([entry]) => {
			visible = entry.intersectionRatio >= visibleThreshold;
			sync();
		}, { threshold: visibleThreshold });
		const preferences = new MutationObserver(sync);

		proximity.observe(element);
		visibility.observe(element);
		preferences.observe(root, { attributes: true, attributeFilter: ["class"] });
		motion.addEventListener("change", sync);
		document.addEventListener("visibilitychange", sync);

		return () => {
			proximity.disconnect();
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
