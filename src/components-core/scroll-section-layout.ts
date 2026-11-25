import { MOBILE_MEDIA_QUERY } from "../hooks/useMobile";
import { getNextScrollSection } from "./scroll-section-target";

const mobile = typeof window !== "undefined" ? window.matchMedia(MOBILE_MEDIA_QUERY) : null;

export function needsDynamicPanelClip() {
	return !mobile?.matches;
}

export function measureScrollPanel(scene: HTMLElement, panel: HTMLElement) {
	const height = panel.offsetHeight;
	const viewportHeight = Math.round(Number.parseFloat(getComputedStyle(panel).minHeight));
	scene.style.setProperty("--panel-height", `${height}px`);
	scene.toggleAttribute("data-scroll-tall", height > viewportHeight);
}

export function clipScrollPanel(scene: HTMLElement, panel: HTMLElement) {
	if (!needsDynamicPanelClip()) return;
	const next = getNextScrollSection(scene);
	const bottom = next ? panel.getBoundingClientRect().bottom - next.getBoundingClientRect().top : -80;
	// Recorta somente o conteúdo coberto, mantendo o canvas visível atrás.
	const inset = `${bottom > 0 ? bottom : -80}px`;
	if (panel.style.getPropertyValue("--covered-bottom") !== inset) {
		panel.style.setProperty("--covered-bottom", inset);
	}
}
