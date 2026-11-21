import { useEffect, useRef, type CSSProperties } from "react";
import "./text-pattern-background.css";

interface TextPatternBackgroundProps {
	text: string;
	fontSize?: number;
	gap?: number;
	separatorGap?: number;
	rowGap?: number;
	color?: string;
	duration?: number;
	scrollReveal?: boolean;
	className?: string;
}

export default function TextPatternBackground({
	text,
	fontSize = 40,
	gap = 6,
	separatorGap = gap,
	rowGap = 0,
	color = "#8a91a3",
	duration = 110,
	scrollReveal = false,
	className = "",
}: TextPatternBackgroundProps) {
	const background = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const element = background.current;
		const scene = element?.closest(".scroll-scene");
		if (!scrollReveal || !element || !scene) return;
		const root = document.documentElement;
		const motion = matchMedia("(prefers-reduced-motion: reduce)");
		const resizeObserver = new ResizeObserver(() => {
			element.style.setProperty("--text-pattern-reveal-width", `${element.clientWidth}px`);
		});
		resizeObserver.observe(element);
		element.style.setProperty("--text-pattern-reveal-width", `${element.clientWidth}px`);
		let frame = 0;
		function update() {
			frame = 0;
			if (!element || !scene) return;
			const header = document.querySelector("header")?.offsetHeight ?? 0;
			const reduced = motion.matches || root.matches(".reduced-motion, .high-contrast");
			const progress = reduced ? 1 : Math.max(0, Math.min(1, (innerHeight - scene.getBoundingClientRect().top) / Math.max(1, innerHeight - header)));
			element.style.setProperty("--text-pattern-progress", `${progress}`);
		}
		function schedule() {
			if (!frame) frame = requestAnimationFrame(update);
		}
		const observer = new MutationObserver(schedule);
		observer.observe(root, { attributes: true, attributeFilter: ["class"] });
		window.addEventListener("scroll", schedule, { passive: true });
		window.addEventListener("resize", schedule);
		motion.addEventListener("change", schedule);
		update();
		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
			resizeObserver.disconnect();
			window.removeEventListener("scroll", schedule);
			window.removeEventListener("resize", schedule);
			motion.removeEventListener("change", schedule);
		};
	}, [scrollReveal]);
	const words = text.trim().split(/\s+/).filter(Boolean);
	const gapBefore = (index: number) => words[index] === "·" || words[(index + words.length - 1) % words.length] === "·" ? separatorGap : gap;
	const width = Math.max(1, words.reduce((total, word, index) => total + word.length * fontSize * 0.62 + gapBefore(index), 0));
	const height = Math.max(1, fontSize + rowGap);
	const escapeXml = (value: string) => value.replace(/[<>&"']/g, character => `&#${character.charCodeAt(0)};`);
	const textAttributes = `font-family="Consolas,monospace" font-size="${fontSize}" font-weight="700"`;
	const content = words.map((word, index) => `<tspan dx="${index ? gapBefore(index) : 0}" textLength="${word.length * fontSize * 0.62}" lengthAdjust="spacingAndGlyphs">${escapeXml(word)}</tspan>`).join("");
	const odd = `<g fill="${escapeXml(color)}"><text x="0" y="${fontSize}" ${textAttributes}>${content}</text></g>`;
	const even = `<g fill="none" stroke="${escapeXml(color)}" stroke-width="0.8">${(scrollReveal ? [0] : [-width / 2, width / 2]).map(x => `<text x="${x}" y="${height + fontSize}" ${textAttributes}>${content}</text>`).join("")}</g>`;
	const image = (rows: string) => `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height * 2}">${rows}</svg>`)}")`;

	return (
		<div
			ref={background}
			aria-hidden="true"
			data-scroll-background
			className={`text-pattern-background pointer-events-none absolute inset-0 -z-1 ${className}`}
			style={{
				backgroundImage: scrollReveal ? undefined : image(odd + even),
				"--text-pattern-width": `${width}px`,
				"--text-pattern-end-gap": `${words.at(-1) === "·" ? fontSize * 0.62 + separatorGap * 2 : 0}px`,
				"--text-pattern-progress": scrollReveal ? 0 : 1,
				animationDuration: `${duration}s`,
			} as CSSProperties}
		>
			{scrollReveal && <>
				<div className="text-pattern-background__rows text-pattern-background__rows--odd" style={{ backgroundImage: image(odd) }} />
				<div className="text-pattern-background__rows text-pattern-background__rows--even" style={{ backgroundImage: image(even) }} />
			</>}
		</div>
	);
}
