import { getCssVar } from "../utils/getCssVar";

export const backgroundValuesLight = {
	// precisar ser em HEX
	// caso queira escolher uma cor:
	// https://www.google.com/search?q=hex+color+online&oq=hex+color+online&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg80gEIMzUyMGowajCoAgCwAgA&sourceid=chrome&ie=UTF-8

	// ===== Particles =====

	count: 40,

	size: { min: 2, max: 20, pulse: 0 },

	speed: {
		x: { min: 0, max: 0.8 },
		y: { min: 0, max: 0.2 },
	},

	// ===== Colors =====

	backgroundColor: getCssVar("--color-gray-background"),

	particlesColors: ["#A7A5FE", "#FEA5CF", "#FCFEA5", "#A5FED3"],

	blending: "none", // "none" | "overlay" | "screen" | "lighten"

	opacity: { center: 0, edge: 1 },

	// ===== Other =====

	skew: 0,

	shapes: ["c", "s", "t"], // "c" | "s" | "t"
};
