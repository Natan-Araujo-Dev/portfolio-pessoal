export const backgroundValues = {
	// precisar ser em HEX
	// caso queira escolher uma cor:
	// https://www.google.com/search?q=hex+color+online&oq=hex+color+online&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg80gEIMzUyMGowajCoAgCwAgA&sourceid=chrome&ie=UTF-8

	count: 100,

	size: { min: 4, max: 4, pulse: 0 },

	speed: {
		x: { min: 0, max: 0.4 },
		y: { min: 1, max: 2 },
	},

	//14141a
	backgroundColorLight: "#a2c4c9",
	backgroundColorDark: "#14141a",

	//ffff00
	particlesColors: ["#a2c4c9"],

	blending: "lighten", // "none" | "overlay" | "screen" | "lighten"

	opacity: { center: 1, edge: 1 },

	skew: 0,

	shapes: ["c"], // "c" | "s" | "t"
};
