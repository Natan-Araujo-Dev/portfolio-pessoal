import { useSyncExternalStore } from "react";

const storageKey = "darkMode";
const listeners = new Set<() => void>();
const root = document.documentElement;
let transitionTimer: number | undefined;

function readDarkMode() {
	try {
		const saved = localStorage.getItem(storageKey);
		if (saved === null) localStorage.setItem(storageKey, "true");
		return saved !== "false";
	} catch { return true; }
}

let darkMode = readDarkMode();
root.classList.toggle("dark", darkMode);

function getDarkMode() {
	return darkMode;
}

function subscribe(listener: () => void) {
	listeners.add(listener);
	return () => { listeners.delete(listener); };
}

function toggle() {
	window.clearTimeout(transitionTimer);
	root.classList.add("theme-transition");
	transitionTimer = window.setTimeout(() => root.classList.remove("theme-transition"), 250);

	darkMode = !darkMode;
	root.classList.toggle("dark", darkMode);
	try { localStorage.setItem(storageKey, String(darkMode)); } catch { /* O tema permanece ativo na página. */ }
	for (const listener of listeners) listener();
}

export default function useTheme() {
	const selected = useSyncExternalStore(subscribe, getDarkMode);
	return { darkMode: selected, toggle };
}
