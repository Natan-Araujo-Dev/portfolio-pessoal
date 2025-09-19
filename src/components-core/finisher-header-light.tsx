import { useEffect } from "react";
import { backgroundValuesLight } from "../common/backgroundValuesLight";

export default function FinisherHeaderLight() {
	useEffect(() => {
		// biome-ignore lint/suspicious/noExplicitAny: <funciona>
		if ((window as any).FinisherHeader) {
			// biome-ignore lint/suspicious/noExplicitAny: <funciona>
			new (window as any).FinisherHeader({
				count: backgroundValuesLight.count,
				size: backgroundValuesLight.size,
				speed: backgroundValuesLight.speed,
				colors: {
					//red
					background: backgroundValuesLight.backgroundColor,
					particles: backgroundValuesLight.particlesColors,
				},
				blending: backgroundValuesLight.blending,
				opacity: backgroundValuesLight.opacity,
				skew: backgroundValuesLight.skew,
				shapes: backgroundValuesLight.shapes,
			});
		}
	}, []);

	return (
		<div
			className="
			header finisher-header-light
			flex
			items-center justify-center
			transition duration-800 opacity-100 dark:opacity-0"
			style={{ width: "100%", height: "100%" }}
		></div>
	);
}
