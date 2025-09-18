import { useEffect } from "react";
import { backgroundValues } from "../../common/backgroundValues";
import useTheme from "../../hooks/useTheme";

export default function FinisherHeader() {
	const { darkMode } = useTheme();

	useEffect(() => {
		// biome-ignore lint/suspicious/noExplicitAny: <funciona>
		if ((window as any).FinisherHeader) {
			// biome-ignore lint/suspicious/noExplicitAny: <funciona>
			new (window as any).FinisherHeader({
				count: backgroundValues.count,
				size: backgroundValues.size,
				speed: backgroundValues.speed,
				colors: {
					background: darkMode
						? backgroundValues.backgroundColorDark
						: backgroundValues.backgroundColorLight,
					particles: backgroundValues.particlesColors,
				},
				blending: backgroundValues.blending,
				opacity: backgroundValues.opacity,
				skew: backgroundValues.skew,
				shapes: backgroundValues.shapes,
			});
		}
	}, [darkMode]);

	return (
		<div
			className="header finisher-header flex items-center justify-center"
			style={{ width: "100%", height: "100%" }}
		></div>
	);
}
