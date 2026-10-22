import { useSyncExternalStore } from "react";
import { translations } from "../common/translations";

export type Language = "pt" | "en" | "es";
const locales = { pt: "pt-BR", en: "en", es: "es" };
const storageKey = "portfolioLanguage";
const isLanguage = (value: string | null): value is Language => value === "pt" || value === "en" || value === "es";

function detectLanguage(): Language {
	try {
		const saved = localStorage.getItem(storageKey);
		if (isLanguage(saved)) return saved;
	} catch { /* A detecção funciona também sem armazenamento local. */ }
	for (const locale of navigator.languages.length ? navigator.languages : [navigator.language]) {
		const language = locale.toLowerCase().split("-")[0];
		if (isLanguage(language)) return language;
	}
	return "pt";
}

let language = detectLanguage();
const listeners = new Set<() => void>();

export function translate(source: string, values: Record<string, string> = {}, selected: Language = language): string {
	const key = source.trim();
	if (!key) return source;
	const translated = selected === "pt" ? key : translations[key]?.[selected === "en" ? 0 : 1] ?? key;
	return source.replace(key, translated.replace(/\{(\w+)\}/g, (placeholder, name: string) => values[name] ?? placeholder));
}

function updateDocument() {
	document.documentElement.lang = locales[language];
	document.title = translate("Natan Araujo - Portfólio");
}
updateDocument();

function setLanguage(next: Language) {
	if (next === language) return;
	language = next;
	try { localStorage.setItem(storageKey, next); } catch { /* A escolha continua ativa nesta página. */ }
	updateDocument();
	for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
	listeners.add(listener);
	return () => { listeners.delete(listener); };
}

export default function useLanguage() {
	const selected = useSyncExternalStore(subscribe, () => language);
	return { language: selected, setLanguage, t: translate };
}
