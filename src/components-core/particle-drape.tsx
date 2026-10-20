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
			ripple: gl.getUniformLocation(program, "ripple"),
			dark: gl.getUniformLocation(program, "dark"),
			pointColor: gl.getUniformLocation(program, "pointColor"),
		};
		gl.uniform1f(gl.getUniformLocation(program, "lineWidth"), Math.max(0.1, drapeConfig.lineWidth));
		gl.uniform1f(gl.getUniformLocation(program, "pointSize"), Math.max(0.1, drapeConfig.pointSize));
		const root = document.documentElement;
		let currentLayout = "";
		let pointCount = 0;
		let frame = 0;
		let previous = 0;
		let time = 0;
		let pointer = [0, 0];
		let target = [0, 0];
		let ripple = [0, 0, -100];

		function draw(now: number) {
			time += previous ? Math.min((now - previous) / 1000, 0.05) : 0;
			previous = now;
			pointer = pointer.map((value, i) => value + (target[i] - value) * 0.05);
			gl!.clear(gl!.COLOR_BUFFER_BIT);
			gl!.uniform1f(uniforms.time, time);
			gl!.uniform2f(uniforms.pointer, pointer[0], pointer[1]);
			gl!.uniform3f(uniforms.ripple, ripple[0], ripple[1], ripple[2]);
			gl!.drawArrays(gl!.POINTS, 0, pointCount);
			frame = requestAnimationFrame(draw);
		}

		function sync() {
			cancelAnimationFrame(frame);
			previous = 0;
			const dark = root.classList.contains("dark");
			const color = drapeConfig.pointColor[dark ? "dark" : "light"];
			const rgb = color.slice(1).match(/.{2}/g)!.map((value) => Number.parseInt(value, 16) / 255);
			gl!.uniform1f(uniforms.dark, dark ? 1 : 0);
			gl!.uniform3f(uniforms.pointColor, rgb[0], rgb[1], rgb[2]);
			if (!document.hidden && !root.matches(".reduced-motion, .high-contrast")) {
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
			target = [event.clientX / window.innerWidth * 2 - 1, 1 - event.clientY / window.innerHeight * 2];
		}
		function click(event: MouseEvent) {
			ripple = [event.clientX / window.innerWidth * 2 - 1, 1 - event.clientY / window.innerHeight * 2, time];
		}
		function leave() {
			target = [0, 0];
		}
		const observer = new MutationObserver(sync);
		observer.observe(root, { attributes: true, attributeFilter: ["class"] });
		const sizeObserver = new ResizeObserver(resize);
		sizeObserver.observe(canvas);
		window.addEventListener("pointermove", move, { passive: true });
		window.addEventListener("click", click);
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
			document.removeEventListener("pointerleave", leave);
			document.removeEventListener("visibilitychange", sync);
			dispose();
		};
	}, []);

	return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
