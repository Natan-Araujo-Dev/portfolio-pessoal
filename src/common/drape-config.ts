export const drapeConfig = {
	backgroundColor: { light: "#f3f0fa", dark: "#0a0a0a" },
	pointColor: { light: "#6a4bff", dark: "#6a4bff" },
	highlightColor: { light: "#302052", dark: "#e4dbff" },

	// 44 mil pontos no desktop.
	pointsPerLine: { mobile: 150, desktop: 220 },
	lineCount: { mobile: 140, desktop: 200 },

	lineWidth: 1,
	// Desvio máximo em graus por fileira, para ambos os lados. 0 = sem desvio.
	lineDirectionVariation: 10,
	pointSize: 1,

	// Deslocamento em % da tela: X positivo = direita; Y positivo = baixo.
	positionX: -2,
	positionY: 0,
	// 1 = tamanho atual; 0.5 = metade; 2 = dobro. Mínimo: 0.1.
	zoom: 1.5,

	brush: 1.2,
	brushRadius: 0.085,
	parallax: 0.3,

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
