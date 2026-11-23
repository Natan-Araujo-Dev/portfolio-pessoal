import { useEffect, useRef } from "react";
import { clipScrollPanel, measureScrollPanel } from "../components-core/scroll-section-layout";
import { setProgrammaticScroll } from "../components-core/smooth-scroll-controller";

function scrollPosition(scene: HTMLElement, panel: HTMLElement, card: HTMLElement, screenTop: number) {
	let offset = 0;
	for (let node: HTMLElement | null = card; node && node !== panel; node = node.offsetParent as HTMLElement | null) {
		offset += node.offsetTop;
	}
	// Após a pausa inicial, o topo do palco avança com a rolagem.
	const stage = panel.parentElement;
	const distance = offset - screenTop;
	const pause = distance > 0 && scene.hasAttribute("data-scroll-tall") && stage
		? stage.offsetHeight - panel.offsetHeight
		: 0;
	return scene.getBoundingClientRect().top + window.scrollY + pause + distance;
}

export default function useProjectDisclosure() {
	const selected = useRef<HTMLDetailsElement | null>(null);
	const frame = useRef(0);

	useEffect(() => () => {
		if (!frame.current) return;
		cancelAnimationFrame(frame.current);
		setProgrammaticScroll(false);
	}, []);

	return (card: HTMLDetailsElement) => {
		const list = card.parentElement;
		const panel = card.closest<HTMLElement>(".scroll-panel");
		const scene = panel?.closest<HTMLElement>(".scroll-scene");
		if (!list || !panel || !scene) return;

		const switching = frame.current !== 0;
		cancelAnimationFrame(frame.current);
		frame.current = 0;
		const opening = !card.open || (switching && selected.current !== card);
		setProgrammaticScroll(opening);
		selected.current = opening ? card : null;
		card.open = opening;
		measureScrollPanel(scene, panel);

		const finish = (screenTop?: number) => {
			frame.current = 0;
			const others = Array.from(list.querySelectorAll<HTMLDetailsElement>(":scope > details[open]"))
				.filter(openCard => openCard !== card);
			if (others.length) {
				for (const openCard of others) openCard.open = false;
				measureScrollPanel(scene, panel);
				// Se outro card estava acima, preserve o projeto escolhido no mesmo ponto da janela.
				if (screenTop !== undefined && Math.abs(card.getBoundingClientRect().top - screenTop) > 1) {
					window.scrollTo({ top: scrollPosition(scene, panel, card, screenTop), behavior: "instant" });
				}
			}
			clipScrollPanel(scene, panel);
			setProgrammaticScroll(false);
		};

		if (!opening) {
			finish();
			return;
		}

		clipScrollPanel(scene, panel);
		const top = card.getBoundingClientRect().top;
		const screenTop = Math.max(0, Math.min(top, window.innerHeight - card.offsetHeight - 2));
		const from = window.scrollY;
		const destination = Math.abs(top - screenTop) <= 1 ? from : scrollPosition(scene, panel, card, screenTop);
		const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches ||
			document.documentElement.classList.contains("reduced-motion");
		if (reduced || Math.abs(destination - from) <= 1) {
			if (destination !== from) window.scrollTo({ top: destination, behavior: "instant" });
			finish(screenTop);
			return;
		}

		const start = performance.now();
		const move = (now: number) => {
			const progress = Math.min(1, (now - start) / 320);
			const eased = 1 - (1 - progress) ** 3;
			window.scrollTo({ top: from + (destination - from) * eased, behavior: "instant" });
			if (progress < 1) frame.current = requestAnimationFrame(move);
			else finish(screenTop);
		};
		frame.current = requestAnimationFrame(move);
	};
}
