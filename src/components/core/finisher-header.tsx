import { useEffect } from "react";

export default function Header() {
	useEffect(() => {
		// biome-ignore lint/suspicious/noExplicitAny: <funciona>
		if ((window as any).FinisherHeader) {
			// biome-ignore lint/suspicious/noExplicitAny: <funciona>
			new (window as any).FinisherHeader({
				count: 30,
				size: { min: 2, max: 25, pulse: 0 },
				speed: {
					x: { min: 0.4, max: 0.8 },
					y: { min: 2, max: 2 },
				},
				colors: {
					background: "#000428",
					particles: ["#ff0000", "#feff00", "#34ff00", "#2b00ff", "#ff00ff"],
				},
				blending: "screen",
				opacity: { center: 0.3, edge: 0.3 },
				skew: 0,
				shapes: ["c", "s", "t"],
			});
		}
	}, []);

	return (
		<div
			className="header finisher-header flex items-center justify-center"
			style={{ width: "100%", height: "100%" }}
		></div>
	);
}
