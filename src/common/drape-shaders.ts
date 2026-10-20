export const drapeVertex = `
	attribute vec2 position;
	uniform float time;
	uniform float aspect;
	uniform float pixelRatio;
	uniform float lineWidth;
	uniform float pointSize;
	uniform vec2 pointer;
	uniform vec3 ripple;
	varying float light;

	void main() {
		vec2 uv = position;
		float height = 0.0;
		float crest = 0.0;
		for (int i = 0; i < 8; i++) {
			float strand = float(i);
			float center = -3.5 + strand
				+ 0.42 * sin(uv.y * 0.85 + time * 0.32 + strand * 1.7)
				+ 0.18 * sin(uv.y * 1.8 - time * 0.22 + strand);
			float distance = (uv.x - center) / 0.23;
			float fold = exp(-distance * distance);
			height += fold * (0.75 + 0.25 * sin(uv.y * 0.6 + strand + time * 0.2));
			crest = max(crest, fold);
		}
		vec3 p = vec3(uv, height * 1.35);
		p.z += 0.12 * sin(uv.y * 1.4 + uv.x + time * 0.3);
		p.x *= lineWidth;

		// Inclinação e perspectiva de uma superfície de tecido.
		float tilt = -0.70 + pointer.y * 0.035;
		float turn = -0.78 + pointer.x * 0.035;
		p.yz = mat2(cos(tilt), sin(tilt), -sin(tilt), cos(tilt)) * p.yz;
		p.xz = mat2(cos(turn), sin(turn), -sin(turn), cos(turn)) * p.xz;
		float roll = 1.92;
		p.xy = mat2(cos(roll), sin(roll), -sin(roll), cos(roll)) * p.xy;
		float perspective = 5.0 / (6.5 - p.z);
		vec2 screen = p.xy * perspective * 0.55;
		screen.x /= aspect;
		vec2 delta = (screen - pointer) * vec2(aspect, 1.0);
		float brush = exp(-dot(delta, delta) * 20.0);
		screen += delta * brush * 0.10 / vec2(aspect, 1.0);

		float age = time - ripple.z;
		float radius = length((screen - ripple.xy) * vec2(aspect, 1.0));
		float wave = exp(-pow((radius - age * 0.8) * 12.0, 2.0))
			* exp(-age * 1.5) * step(0.0, age);
		screen += normalize(delta + vec2(0.001)) * wave * 0.025;
		float edge = smoothstep(0.0, 0.5, 4.0 - abs(uv.x))
			* smoothstep(0.0, 0.6, 4.0 - abs(uv.y));
		light = (0.04 + pow(crest, 2.0) * 0.86 + wave * 0.7) * edge;
		gl_Position = vec4(screen, 0.0, 1.0);
		gl_PointSize = clamp((0.75 + crest * 1.1) * perspective * pixelRatio, 1.0, 5.0) * pointSize;
	}
`;

export const drapeFragment = `
	precision mediump float;
	uniform float dark;
	uniform vec3 pointColor;
	varying float light;

	void main() {
		float radius = length(gl_PointCoord - 0.5) * 2.0;
		float alpha = (1.0 - smoothstep(0.2, 1.0, radius)) * light;
		vec3 highlight = mix(pointColor * 0.65, mix(pointColor, vec3(1.0), 0.8), dark);
		gl_FragColor = vec4(mix(pointColor, highlight, clamp(light, 0.0, 1.0)), alpha);
	}
`;
