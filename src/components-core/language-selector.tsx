import { Check, ChevronDown, Languages } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import useLanguage, { type Language } from "../hooks/useLanguage";

export default function LanguageSelector() {
	const { language, setLanguage, t } = useLanguage();
	const id = useId();
	const trigger = useRef<HTMLButtonElement>(null);
	const menu = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState(false);
	const options: { value: Language; label: string; locale: string }[] = [
		{ value: "pt", label: "Português", locale: "pt-BR" },
		{ value: "en", label: "English", locale: "en" },
		{ value: "es", label: "Español", locale: "es" },
	];
	function positionMenu() {
		const bounds = trigger.current?.getBoundingClientRect();
		const element = menu.current;
		if (!bounds || !element) return;
		const height = element.offsetHeight || 158;
		element.style.left = `${Math.max(8, Math.min(bounds.right - 184, innerWidth - 192))}px`;
		element.style.top = `${Math.max(8, bounds.bottom + height + 8 <= innerHeight ? bounds.bottom + 8 : bounds.top - height - 8)}px`;
	}
	useEffect(() => {
		if (!open) return;
		const close = () => menu.current?.hidePopover();
		window.addEventListener("scroll", close, { passive: true });
		window.addEventListener("resize", close);
		return () => {
			window.removeEventListener("scroll", close);
			window.removeEventListener("resize", close);
		};
	}, [open]);
	return (
		<div className="font-tomorrow text-sm">
			<button ref={trigger} type="button" popoverTarget={id} aria-controls={id} aria-label={t("Idioma")} aria-haspopup="menu" aria-expanded={open}
				onClick={positionMenu}
				onKeyDown={event => {
					if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
					event.preventDefault(); positionMenu(); menu.current?.showPopover();
				}}
				className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-gray-medium px-3 text-gray-dark hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-green-light dark:text-white dark:hover:bg-white/5">
				<Languages size={16} className="shrink-0" aria-hidden="true" />
				<span>{language.toUpperCase()}</span>
				<ChevronDown size={14} aria-hidden="true" className={`shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
			</button>
			<div ref={menu} id={id} popover="auto" role="menu" aria-label={t("Idioma")} className="language-popover font-tomorrow"
				onToggle={event => {
					setOpen(event.newState === "open");
					if (event.newState === "open") menu.current?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus({ preventScroll: true });
				}}
				onKeyDown={event => {
					if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
					event.preventDefault();
					const items = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button"));
					const index = items.indexOf(document.activeElement as HTMLButtonElement);
					const next = event.key === "Home" ? 0 : event.key === "End" ? items.length - 1 : (index + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
					items[next]?.focus();
				}}>
				{options.map(option => (
					<button key={option.value} type="button" role="menuitemradio" lang={option.locale} aria-checked={language === option.value}
						onClick={() => { setLanguage(option.value); menu.current?.hidePopover(); trigger.current?.focus({ preventScroll: true }); }}
						className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg px-3 text-left text-sm hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-green-light dark:hover:bg-white/5 aria-checked:bg-emerald-500/10 aria-checked:text-green-dark dark:aria-checked:text-green-light">
						{option.label}{language === option.value && <Check size={16} aria-hidden="true" />}
					</button>
				))}
			</div>
		</div>
	);
}
