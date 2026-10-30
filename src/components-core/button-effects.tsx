import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import ClickSpark, { type ClickSparkHandle } from "./ClickSpark";

const BUTTONS = 'button, summary, [role="button"], .project-link, a.expand-lg.fill-color, header a, [data-contact-trigger]';
type Motion = { x: number; y: number; vx: number; vy: number; tx: number; ty: number; original: string; baseX: string; baseY: string };

export default function ButtonEffects() {
	const sparks = useRef<ClickSparkHandle>(null);
	useEffect(() => {
		const reduced = matchMedia('(prefers-reduced-motion: reduce)');
		const fine = matchMedia('(hover: hover) and (pointer: fine)');
		const disabled = () => reduced.matches || document.documentElement.matches('.reduced-motion, .high-contrast');
		const motions = new Map<HTMLElement, Motion>();
		let frame = 0;
		let last = 0;
		let pointer: { x: number; y: number } | null = null;
		function animate(now: number) {
			frame = 0;
			const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
			last = now;
			let moving = false;
			for (const [element, m] of motions) {
				const steps = Math.ceil(dt * 120);
				for (let i = 0; i < steps; i++) {
					const step = dt / steps;
					m.vx += (500 * (m.tx - m.x) - 40 * m.vx) * step;
					m.vy += (500 * (m.ty - m.y) - 40 * m.vy) * step;
					m.x += m.vx * step;
					m.y += m.vy * step;
				}
				const resting = Math.abs(m.x - m.tx) + Math.abs(m.y - m.ty) + Math.abs(m.vx) + Math.abs(m.vy) < 0.05;
				if (resting) { m.x = m.tx; m.y = m.ty; m.vx = m.vy = 0; }
				element.style.translate = `calc(${m.baseX} + ${m.x.toFixed(2)}px) calc(${m.baseY} + ${m.y.toFixed(2)}px)`;
				if (resting && !m.tx && !m.ty) { element.style.translate = m.original; motions.delete(element); }
				else if (!resting) moving = true;
			}
			if (moving) frame = requestAnimationFrame(animate);
			else last = 0;
		}
		function measure() {
			if (disabled()) {
				cancelAnimationFrame(frame); frame = 0; last = 0;
				for (const [element, m] of motions) element.style.translate = m.original;
				motions.clear();
				return;
			}
			let winner: HTMLElement | null = null;
			let nearest = Infinity;
			let closest = Infinity;
			let targetX = 0, targetY = 0;
			if (pointer && fine.matches && !disabled()) {
				for (const element of document.querySelectorAll<HTMLElement>(BUTTONS)) {
					if (!element.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }) || element.matches(':disabled, [aria-disabled="true"]')) continue;
					const r = element.getBoundingClientRect(), m = motions.get(element);
					if (r.bottom < 0 || r.top > innerHeight) continue;
					const dx = pointer.x - (r.left - (m?.x ?? 0) + r.width / 2);
					const dy = pointer.y - (r.top - (m?.y ?? 0) + r.height / 2);
					const outside = Math.hypot(Math.max(0, Math.abs(dx) - r.width / 2), Math.max(0, Math.abs(dy) - r.height / 2));
					const center = Math.hypot(dx, dy);
					if (outside > 100 || outside > nearest || (outside === nearest && center >= closest)) continue;
					winner = element; nearest = outside; closest = center;
					const t = Math.max(0, Math.min(1, (outside - 50) / 50));
					const pull = 1 - t * t * (3 - 2 * t);
					targetX = (dx / 5) * pull; targetY = (dy / 5) * pull;
				}
			}
			for (const m of motions.values()) { m.tx = 0; m.ty = 0; }
			if (winner) {
				if (!motions.has(winner)) {
					const base = getComputedStyle(winner).translate.split(' ');
					motions.set(winner, { x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0, original: winner.style.translate, baseX: base[0] === 'none' ? '0px' : base[0], baseY: base[1] ?? '0px' });
				}
				const m = motions.get(winner)!; m.tx = targetX; m.ty = targetY;
			}
			if (!frame && motions.size) frame = requestAnimationFrame(animate);
		}
		const move = (event: PointerEvent) => {
			if (event.pointerType === 'touch') return;
			pointer = { x: event.clientX, y: event.clientY }; measure();
		};
		const reset = () => { pointer = null; measure(); };
		const click = (event: MouseEvent) => {
			if (disabled()) return;
			const target = event.target instanceof Element ? event.target : document.documentElement;
			const r = target.getBoundingClientRect();
			sparks.current?.spark(event.detail ? event.clientX : r.left + r.width / 2, event.detail ? event.clientY : r.top + r.height / 2);
		};
		window.addEventListener('pointermove', move, { passive: true });
		window.addEventListener('scroll', reset, { passive: true, capture: true });
		window.addEventListener('blur', reset);
		document.documentElement.addEventListener('pointerleave', reset);
		document.addEventListener('click', click, true);
		const observer = new MutationObserver(reset);
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
		reduced.addEventListener('change', reset);
		return () => {
			cancelAnimationFrame(frame); observer.disconnect(); reduced.removeEventListener('change', reset);
			window.removeEventListener('pointermove', move); window.removeEventListener('scroll', reset, true); window.removeEventListener('blur', reset);
			document.documentElement.removeEventListener('pointerleave', reset); document.removeEventListener('click', click, true);
			for (const [element, m] of motions) element.style.translate = m.original;
		};
	}, []);
	return createPortal(<ClickSpark ref={sparks} easing="linear" sparkColor="#01c951" className="button-sparks" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 2147483647 }} />, document.body);
}
