export const backgroundValuesDark = {
	// precisar ser em HEX
	// caso queira escolher uma cor:
	// https://www.google.com/search?q=hex+color+online&oq=hex+color+online&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg80gEIMzUyMGowajCoAgCwAgA&sourceid=chrome&ie=UTF-8

	count: 10,

	size: { min: 1300, max: 1500, pulse: 0 },

	speed: {
		x: { min: 0.1, max: 0.6 },
		y: { min: 0.1, max: 0.6 },
	},

	backgroundColor: "#9138e5",

	particlesColors: ["#ff4848", "#000000", "#2235e5", "#000000", "#ff0000"],

	blending: "overlay", // "none" | "overlay" | "screen" | "lighten"

	opacity: { center: 0.5, edge: 0.05 },

	skew: 0,

	shapes: ["c"], // "c" | "s" | "t"
};
