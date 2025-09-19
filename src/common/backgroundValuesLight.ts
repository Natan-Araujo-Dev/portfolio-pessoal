export const backgroundValuesLight = {
	// precisar ser em HEX
	// caso queira escolher uma cor:
	// https://www.google.com/search?q=hex+color+online&oq=hex+color+online&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg80gEIMzUyMGowajCoAgCwAgA&sourceid=chrome&ie=UTF-8

	count: 34,

	size: { min: 5, max: 120, pulse: 0.1 },

	speed: {
		x: { min: 0, max: 0.2 },
		y: { min: 0, max: 0.4 },
	},

	backgroundColor: "#b580ff",

	particlesColors: ["#ffe960", "#87ddfe", "#8481ff", "#fc7bfc", "#e2ffa5"],

	blending: "overlay", // "none" | "overlay" | "screen" | "lighten"

	opacity: { center: 0, edge: 0.7 },

	skew: 0,

	shapes: ["c"], // "c" | "s" | "t"
};
