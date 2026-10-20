import { getCssVar } from "../utils/getCssVar";

export const backgroundValuesLight = {
	// precisar ser em HEX
	// caso queira escolher uma cor:
	// https://www.google.com/search?q=hex+color+online&oq=hex+color+online&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg80gEIMzUyMGowajCoAgCwAgA&sourceid=chrome&ie=UTF-8

	// ===== Particles =====

	count: 40,

	size: { min: 6, max: 22, pulse: 0 },

	speed: {
		x: { min: 0.15, max: 0.8 },
		y: { min: 0.08, max: 0.3 },
	},

	// ===== Colors =====

	backgroundColor: getCssVar("--color-gray-background"),

	particlesColors: ["#22845b", "#3b927e", "#56846b", "#4b8e98"],

	blending: "none", // "none" | "overlay" | "screen" | "lighten"

	opacity: { center: 0.15, edge: 0.75 },

	// ===== Other =====

	skew: 0,

	shapes: ["c", "s", "t"], // "c" | "s" | "t"
};
