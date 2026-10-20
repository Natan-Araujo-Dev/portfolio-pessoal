import { useEffect, useRef } from "react";
import { drapeConfig } from "../common/drape-config";
import { drapeFragment, drapeVertex } from "../common/drape-shaders";

export default function ParticleDrape() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const gl = canvas?.getContext("webgl", { alpha: true, antialias: false });
		if (!canvas || !gl) return;

		function compile(type: number, source: string) {
			const shader = gl!.createShader(type);
			if (!shader) return null;
			gl!.shaderSource(shader, source);
			gl!.compileShader(shader);
			if (gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) return shader;
			gl!.deleteShader(shader);
			return null;
		}

		const vertex = compile(gl.VERTEX_SHADER, drapeVertex);
		const fragment = compile(gl.FRAGMENT_SHADER, drapeFragment);
		const program = gl.createProgram();
		const buffer = gl.createBuffer();
		function dispose() {
			gl!.deleteBuffer(buffer);
			gl!.deleteProgram(program);
			gl!.deleteShader(vertex);
			gl!.deleteShader(fragment);
		}
		if (!vertex || !fragment || !program || !buffer) {
			dispose();
			return;
		}
		gl.attachShader(program, vertex);
		gl.attachShader(program, fragment);
		gl.linkProgram(program);
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			dispose();
			return;
		}
		gl.useProgram(program);
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		const position = gl.getAttribLocation(program, "position");
		gl.enableVertexAttribArray(position);
		gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

		const uniforms = {
			time: gl.getUniformLocation(program, "time"),
			aspect: gl.getUniformLocation(program, "aspect"),
			pixelRatio: gl.getUniformLocation(program, "pixelRatio"),
			pointer: gl.getUniformLocation(program, "pointer"),
			cursor: gl.getUniformLocation(program, "cursor"),
			trails: gl.getUniformLocation(program, "trails[0]"),
			ripples: gl.getUniformLocation(program, "ripples[0]"),
			pointColor: gl.getUniformLocation(program, "pointColor"),
			highlightColor: gl.getUniformLocation(program, "highlightColor"),
		};
		gl.uniform1f(gl.getUniformLocation(program, "lineWidth"), Math.max(0.1, drapeConfig.lineWidth));
		gl.uniform1f(gl.getUniformLocation(program, "lineDirectionVariation"), Math.max(0, drapeConfig.lineDirectionVariation));
		gl.uniform1f(gl.getUniformLocation(program, "pointSize"), Math.max(0.1, drapeConfig.pointSize));
		gl.uniform1f(gl.getUniformLocation(program, "zoom"), Math.max(0.1, drapeConfig.zoom));
		gl.uniform2f(
			gl.getUniformLocation(program, "positionOffset"),
			drapeConfig.positionX / 50,
			-drapeConfig.positionY / 50,
		);
		gl.uniform1f(gl.getUniformLocation(program, "brush"), Math.max(0, drapeConfig.brush));
		gl.uniform1f(gl.getUniformLocation(program, "brushRadius"), Math.max(0.01, drapeConfig.brushRadius));
		gl.uniform1f(gl.getUniformLocation(program, "parallax"), Math.max(0, drapeConfig.parallax));
		for (const [name, wave] of Object.entries(drapeConfig.waves)) {
			gl.uniform3f(
				gl.getUniformLocation(program, `${name}Wave`),
				wave.amplitude,
				wave.frequency,
				wave.speed,
			);
		}
		const root = document.documentElement;
		let currentLayout = "";
		let pointCount = 0;
		let frame = 0;
		let previous = 0;
		let time = 0;
		let pointer = [0, 0];
		let target = [0, 0];
		let pointerActive = false;
		let cursorStrength = 0;
		let trailIndex = 0;
		let rippleIndex = 0;
		let lastTrail = -1;
		const trails = new Float32Array(6 * 4);
		const ripples = new Float32Array(8 * 3);
		for (let i = 0; i < 6; i++) trails[i * 4 + 2] = -100;
		for (let i = 0; i < 8; i++) ripples[i * 3 + 2] = -100;

		function draw(now: number) {
			const elapsed = previous ? Math.min((now - previous) / 1000, 0.1) : 0;
			time += elapsed;
			previous = now;
			const smoothing = 1 - Math.exp(-elapsed * 7);
			pointer = pointer.map((value, i) => value + ((pointerActive ? target[i] : 0) - value) * smoothing);
			cursorStrength += ((pointerActive ? 1 : 0) - cursorStrength) * smoothing;
			gl!.clear(gl!.COLOR_BUFFER_BIT);
			gl!.uniform1f(uniforms.time, time);
			gl!.uniform2f(uniforms.pointer, pointer[0], pointer[1]);
			gl!.uniform3f(uniforms.cursor, target[0], target[1], cursorStrength);
			gl!.uniform4fv(uniforms.trails, trails);
			gl!.uniform3fv(uniforms.ripples, ripples);
			gl!.drawArrays(gl!.POINTS, 0, pointCount);
			frame = requestAnimationFrame(draw);
		}

		function sync() {
			const dark = root.classList.contains("dark");
			for (const name of ["pointColor", "highlightColor"] as const) {
				const color = drapeConfig[name][dark ? "dark" : "light"];
				const rgb = color.slice(1).match(/.{2}/g)!.map((value) => Number.parseInt(value, 16) / 255);
				gl!.uniform3f(uniforms[name], rgb[0], rgb[1], rgb[2]);
			}
			if (document.hidden || root.matches(".reduced-motion, .high-contrast")) {
				cancelAnimationFrame(frame);
				frame = 0;
				previous = 0;
			} else if (!frame) {
				frame = requestAnimationFrame(draw);
			}
		}
		function resize() {
			const layout = window.innerWidth < 640 ? "mobile" : "desktop";
			if (layout !== currentLayout) {
				currentLayout = layout;
				const columns = Math.min(500, Math.max(2, Math.round(drapeConfig.pointsPerLine[layout])));
				const rows = Math.min(500, Math.max(2, Math.round(drapeConfig.lineCount[layout])));
				pointCount = columns * rows;
				const points = new Float32Array(pointCount * 2);
				for (let y = 0; y < rows; y++) {
					for (let x = 0; x < columns; x++) {
						const index = (y * columns + x) * 2;
						points[index] = (x / (columns - 1) - 0.5) * 8;
						points[index + 1] = (y / (rows - 1) - 0.5) * 8;
					}
				}
				gl!.bufferData(gl!.ARRAY_BUFFER, points, gl!.STATIC_DRAW);
			}
			const ratio = Math.min(window.devicePixelRatio || 1, 2);
			canvas!.width = Math.round(canvas!.clientWidth * ratio);
			canvas!.height = Math.round(canvas!.clientHeight * ratio);
			gl!.viewport(0, 0, canvas!.width, canvas!.height);
			gl!.uniform1f(uniforms.aspect, canvas!.width / Math.max(canvas!.height, 1));
			gl!.uniform1f(uniforms.pixelRatio, ratio);
		}
		function move(event: PointerEvent) {
			const rect = canvas!.getBoundingClientRect();
			const next = [(event.clientX - rect.left) / rect.width * 2 - 1, 1 - (event.clientY - rect.top) / rect.height * 2];
			const distance = Math.hypot(next[0] - target[0], next[1] - target[1]);
			if (pointerActive && distance > 0.002 && time - lastTrail > 0.025) {
				trails.set([next[0], next[1], time, Math.min(1, distance * 12)], trailIndex * 4);
				trailIndex = (trailIndex + 1) % 6;
				lastTrail = time;
			}
			target = next;
			pointerActive = true;
		}
		function click(event: MouseEvent) {
			if (event.detail === 0) return;
			const rect = canvas!.getBoundingClientRect();
			ripples.set([(event.clientX - rect.left) / rect.width * 2 - 1, 1 - (event.clientY - rect.top) / rect.height * 2, time], rippleIndex * 3);
			rippleIndex = (rippleIndex + 1) % 8;
		}
		function leave() {
			pointerActive = false;
		}
		function release(event: PointerEvent) {
			if (event.pointerType !== "mouse") leave();
		}
		const observer = new MutationObserver(sync);
		observer.observe(root, { attributes: true, attributeFilter: ["class"] });
		const sizeObserver = new ResizeObserver(resize);
		sizeObserver.observe(canvas);
		window.addEventListener("pointermove", move, { passive: true });
		window.addEventListener("click", click);
		window.addEventListener("blur", leave);
		window.addEventListener("pointerup", release);
		window.addEventListener("pointercancel", leave);
		document.addEventListener("pointerleave", leave);
		document.addEventListener("visibilitychange", sync);
		resize();
		sync();

		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
			sizeObserver.disconnect();
			window.removeEventListener("pointermove", move);
			window.removeEventListener("click", click);
			window.removeEventListener("blur", leave);
			window.removeEventListener("pointerup", release);
			window.removeEventListener("pointercancel", leave);
			document.removeEventListener("pointerleave", leave);
			document.removeEventListener("visibilitychange", sync);
			dispose();
		};
	}, []);

	return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
