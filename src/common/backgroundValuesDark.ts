export const backgroundValuesDark = {
	// precisar ser em HEX
	// caso queira escolher uma cor:
	// https://www.google.com/search?q=hex+color+online&oq=hex+color+online&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg80gEIMzUyMGowajCoAgCwAgA&sourceid=chrome&ie=UTF-8

	// ===== Particles =====

	count: 40,

	size: { min: 2, max: 40, pulse: 0 },

	speed: {
		x: { min: 0, max: 0.8 },
		y: { min: 0, max: 0.2 },
	},

	// ===== Colors =====

	backgroundColor: "#15182e",

	particlesColors: ["#ff926b", "#62ff62", "#acaaff", "#1bffc2", "#f9a5fe"],

	blending: "none", // "none" | "overlay" | "screen" | "lighten"

	opacity: { center: 0, edge: 1 },

	// ===== Other =====

	skew: 0,

	shapes: ["c", "s", "t"], // "c" | "s" | "t"
};
