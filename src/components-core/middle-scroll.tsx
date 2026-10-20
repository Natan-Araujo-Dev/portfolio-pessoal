import { useEffect } from "react";

export default function MiddleScroll() {
	useEffect(() => {
		const deadZone = 25;
		const speedMultiplier = 2;
		let origin: { x: number; y: number } | null = null;
		let pointerY = 0;
		let frame = 0;
		let previousTime = 0;
		let dragged = false;
		let suppressClick = false;

		function stop() {
			origin = null;
			cancelAnimationFrame(frame);
			document.documentElement.classList.remove("middle-scroll");
			document.documentElement.removeAttribute("data-scroll-direction");
		}

		function scroll(time: number) {
			if (!origin) return;
			const elapsed = previousTime ? Math.min(time - previousTime, 50) : 0;
			previousTime = time;
			const distance = pointerY - origin.y;
			const speed =
				Math.sign(distance) *
				Math.min(
					Math.max(Math.abs(distance) - deadZone, 0) * 0.01 * speedMultiplier,
					6,
				);
			window.scrollBy({ top: speed * elapsed, behavior: "instant" });
			frame = requestAnimationFrame(scroll);
		}

		function start(event: MouseEvent) {
			if (origin) {
				event.preventDefault();
				event.stopPropagation();
				suppressClick = true;
				stop();
				return;
			}
			suppressClick = false;
			if (event.button !== 1 || !(event.target instanceof Element)) return;
			if (
				event.target.closest(
					"a, button, input, textarea, select, summary, [contenteditable], [role='button']",
				)
			)
				return;
			if (document.documentElement.scrollHeight <= window.innerHeight) return;
			event.preventDefault();
			origin = { x: event.clientX, y: event.clientY };
			pointerY = event.clientY;
			previousTime = 0;
			dragged = false;
			document.documentElement.classList.add("middle-scroll");
			frame = requestAnimationFrame(scroll);
		}

		function move(event: MouseEvent) {
			pointerY = event.clientY;
			if (!origin) return;
			const distance = pointerY - origin.y;
			if (Math.abs(distance) > deadZone) {
				document.documentElement.setAttribute(
					"data-scroll-direction",
					distance < 0 ? "up" : "down",
				);
			} else {
				document.documentElement.removeAttribute("data-scroll-direction");
			}
			if (event.buttons === 4 && Math.abs(distance) > deadZone)
				dragged = true;
		}

		function release(event: MouseEvent) {
			if (event.button === 1 && dragged) stop();
		}

		function cancelClick(event: MouseEvent) {
			if (!suppressClick) return;
			event.preventDefault();
			event.stopPropagation();
			suppressClick = false;
		}

		document.addEventListener("mousedown", start, true);
		document.addEventListener("mousemove", move);
		document.addEventListener("mouseup", release);
		document.addEventListener("click", cancelClick, true);
		document.addEventListener("auxclick", cancelClick, true);
		document.addEventListener("keydown", stop);
		document.addEventListener("wheel", stop, { passive: true });
		window.addEventListener("blur", stop);
		return () => {
			cancelAnimationFrame(frame);
			document.documentElement.classList.remove("middle-scroll");
			document.documentElement.removeAttribute("data-scroll-direction");
			document.removeEventListener("mousedown", start, true);
			document.removeEventListener("mousemove", move);
			document.removeEventListener("mouseup", release);
			document.removeEventListener("click", cancelClick, true);
			document.removeEventListener("auxclick", cancelClick, true);
			document.removeEventListener("keydown", stop);
			document.removeEventListener("wheel", stop);
			window.removeEventListener("blur", stop);
		};
	}, []);

	return null;
}
