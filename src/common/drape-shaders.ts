export const drapeVertex = `
	attribute vec2 position;
	uniform float time;
	uniform float aspect;
	uniform float pixelRatio;
	uniform float lineWidth;
	uniform float lineDirectionVariation;
	uniform float pointSize;
	uniform vec2 positionOffset;
	uniform float zoom;
	uniform float brush;
	uniform float brushRadius;
	uniform float parallax;
	// Cada onda recebe amplitude, frequência e velocidade, nesta ordem.
	uniform vec3 primaryWave;
	uniform vec3 secondaryWave;
	uniform vec3 widthWave;
	uniform vec3 heightWave;
	uniform vec3 depthWave;
	uniform vec2 pointer;
	uniform vec3 cursor;
	uniform vec4 trails[6];
	uniform vec3 ripples[8];
	varying float light;
	varying float tint;

	void main() {
		vec2 uv = position;
		float height = 0.0;
		float crest = 0.0;
		for (int i = 0; i < 8; i++) {
			float strand = float(i);
			float phase = strand * 2.399;
			float center = -3.5 + strand
				+ primaryWave.x * sin(uv.y * primaryWave.y + time * primaryWave.z + phase)
				+ secondaryWave.x * sin(uv.y * secondaryWave.y - time * secondaryWave.z + phase * 0.6);
			float width = max(0.01, 0.22 + widthWave.x * sin(uv.y * widthWave.y + time * widthWave.z + phase));
			float distance = (uv.x - center) / width;
			float fold = exp(-distance * distance);
			height += fold * (1.15 + heightWave.x * sin(uv.y * heightWave.y + phase + time * heightWave.z));
			crest = max(crest, fold);
		}
		vec3 p = vec3(uv.y, uv.x * lineWidth, height * 1.25 - 0.45);
		p.z += depthWave.x * sin(uv.y * depthWave.y + uv.x + time * depthWave.z);

		// Cada fileira gira em torno do próprio centro; vizinhas variam suavemente.
		float direction = radians(lineDirectionVariation) * sin(uv.y * 0.85);
		vec2 center = vec2(uv.y, 0.0);
		p.xy = center + mat2(cos(direction), sin(direction), -sin(direction), cos(direction)) * (p.xy - center);

		float tilt = radians(-40.0) + pointer.y * 0.18 * parallax;
		float turn = radians(-45.0) + pointer.x * 0.22 * parallax;
		p.yz = mat2(cos(tilt), sin(tilt), -sin(tilt), cos(tilt)) * p.yz;
		p.xz = mat2(cos(turn), sin(turn), -sin(turn), cos(turn)) * p.xz;
		float roll = radians(110.0);
		p.xy = mat2(cos(roll), sin(roll), -sin(roll), cos(roll)) * p.xy;
		float perspective = 5.0 / max(2.5, 6.5 - p.z);
		vec2 screen = p.xy * perspective * 0.55;
		screen.x /= aspect;
		screen = screen * zoom + positionOffset;

		// Pincel local imediato; a rotação da cortina usa outro ponteiro, suavizado.
		vec2 metric = vec2(aspect, 1.0);
		vec2 delta = (screen - cursor.xy) * metric;
		float radius = max(brushRadius * 2.0, 0.01);
		float influence = exp(-dot(delta, delta) / (radius * radius));
		vec2 displacement = delta * influence * cursor.z * 0.65;
		for (int i = 0; i < 6; i++) {
			float age = time - trails[i].z;
			vec2 offset = (screen - trails[i].xy) * metric;
			float falloff = exp(-dot(offset, offset) / (radius * radius));
			displacement += offset * falloff * exp(-age * 5.0) * trails[i].w * 0.22;
		}
		screen += displacement * brush / metric;

		// Ondas independentes: cliques consecutivos se somam.
		float waveLight = 0.0;
		for (int i = 0; i < 8; i++) {
			float age = time - ripples[i].z;
			vec2 offset = (screen - ripples[i].xy) * metric;
			float distance = length(offset);
			float envelope = exp(-age * 1.4);
			float band = (distance - age * 1.25) / 0.10;
			float wave = exp(-band * band) * envelope;
			screen += offset / max(distance, 0.001) * wave * 0.055 / metric;
			waveLight += wave * 1.3 + envelope * 0.12;
		}
		float edge = smoothstep(0.0, 0.5, 4.0 - abs(uv.x))
			* smoothstep(0.0, 0.6, 4.0 - abs(uv.y));
		float ridge = pow(crest, 2.5);
		light = (0.008 + ridge * 1.25 + waveLight) * edge;
		tint = clamp(ridge * 0.85 + 0.15 * sin(uv.y * 0.7 + time * 0.12) + waveLight, 0.0, 1.0);
		gl_Position = vec4(screen, 0.0, 1.0);
		gl_PointSize = clamp((0.85 + crest * 1.25) * perspective * pixelRatio * pointSize * zoom, 1.0, 24.0);
	}
`;

export const drapeFragment = `
	precision mediump float;
	uniform vec3 pointColor;
	uniform vec3 highlightColor;
	varying float light;
	varying float tint;

	void main() {
		float radius = length(gl_PointCoord - 0.5) * 2.0;
		float glow = exp(-radius * radius * 2.0) * (1.0 - smoothstep(0.7, 1.0, radius));
		gl_FragColor = vec4(mix(pointColor, highlightColor, tint), clamp(light * glow, 0.0, 1.0));
	}
`;
