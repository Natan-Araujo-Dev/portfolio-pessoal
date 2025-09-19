import { useEffect } from "react";
import { backgroundValuesDark } from "../common/backgroundValuesDark";

export default function FinisherHeaderDark() {
	useEffect(() => {
		// biome-ignore lint/suspicious/noExplicitAny: <funciona>
		if ((window as any).FinisherHeader) {
			// biome-ignore lint/suspicious/noExplicitAny: <funciona>
			new (window as any).FinisherHeader({
				count: backgroundValuesDark.count,
				size: backgroundValuesDark.size,
				speed: backgroundValuesDark.speed,
				colors: {
					background: backgroundValuesDark.backgroundColor,
					particles: backgroundValuesDark.particlesColors,
				},
				blending: backgroundValuesDark.blending,
				opacity: backgroundValuesDark.opacity,
				skew: backgroundValuesDark.skew,
				shapes: backgroundValuesDark.shapes,
			});
		}
	}, []);

	return (
		<div
			className="
			header finisher-header-dark
			flex
			items-center justify-center
			transition duration-800 opacity-0 dark:opacity-100"
			style={{ width: "100%", height: "100%" }}
		></div>
	);
}
