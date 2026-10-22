export const drapeConfig = {
	backgroundColor: { light: "#edf4f0", dark: "#0a0a0a" },
	pointColor: { light: "#488d7c", dark: "#6a4bff" },
	highlightColor: { light: "#276a83", dark: "#e4dbff" },

	// Densidade original: 33 mil pontos no mobile; 44 mil no desktop.
	pointsPerLine: { mobile: 220, desktop: 220 },
	lineCount: { mobile: 150, desktop: 200 },
	maxPixelRatio: { mobile: 1, desktop: 2 },
	framesPerSecond: { mobile: 30, desktop: 60 },

	lineWidth: 1,
	// Desvio máximo em graus por fileira, para ambos os lados. 0 = sem desvio.
	lineDirectionVariation: 10,
	pointSize: 1,
	lightPointScale: 1.5,

	// Deslocamento em % da tela: X positivo = direita; Y positivo = baixo.
	positionX: -2,
	positionY: 0,
	// 1 = tamanho atual; 0.5 = metade; 2 = dobro. Mínimo: 0.1.
	zoom: 1.5,

	brush: 1.2,
	brushRadius: 0.085,
	parallax: 0.05,

	waves: {
		primary: {
			amplitude: 0.30,
			frequency: 0.45,
			speed: 0.24,
		},
		secondary: {
			amplitude: 0.05,
			frequency: 0.85,
			speed: 0.18,
		},
		width: {
			amplitude: 0.02,
			frequency: 0.45,
			speed: 0.30,
		},
		height: {
			amplitude: 0.20,
			frequency: 0.40,
			speed: 0.25,
		},
		depth: {
			amplitude: 0.03,
			frequency: 0.70,
			speed: 0.30,
		},
	},
};
