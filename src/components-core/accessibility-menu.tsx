import { Contrast, RotateCcw, Wind, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import Text from "../components-base/text";
import useAccessibility from "../hooks/useAccessibility";

export default function AccessibilityMenu() {
	const [open, setOpen] = useState(false);
	const {
		fontSize,
		changeFontSize,
		setFontSize,
		highContrast,
		setHighContrast,
		reducedMotion,
		setReducedMotion,
	} = useAccessibility();
	const container = useRef<HTMLDivElement>(null);
	const trigger = useRef<HTMLButtonElement>(null);
	const panelId = useId();

	useEffect(() => {
		function toggleWithShortcut(event: KeyboardEvent) {
			if (
				event.key.toLowerCase() !== "f" ||
				event.repeat ||
				event.ctrlKey ||
				event.altKey ||
				event.metaKey ||
				(event.target instanceof Element &&
					event.target.closest(
						"input, textarea, select, [contenteditable]:not([contenteditable='false']), [role='textbox']",
					))
			)
				return;
			event.preventDefault();
			setOpen((current) => !current);
			trigger.current?.focus({ preventScroll: true });
		}

		document.addEventListener("keydown", toggleWithShortcut);
		return () => document.removeEventListener("keydown", toggleWithShortcut);
	}, []);

	useEffect(() => {
		if (!open) return;

		function closeOutside(event: PointerEvent) {
			if (!container.current?.contains(event.target as Node)) setOpen(false);
		}

		function closeOnEscape(event: KeyboardEvent) {
			if (event.key !== "Escape") return;
			trigger.current?.focus();
			setOpen(false);
		}

		document.addEventListener("pointerdown", closeOutside);
		document.addEventListener("keydown", closeOnEscape);
		return () => {
			document.removeEventListener("pointerdown", closeOutside);
			document.removeEventListener("keydown", closeOnEscape);
		};
	}, [open]);

	return (
		<div ref={container} className="fixed bottom-4 right-4 z-[70]">
			<button
				ref={trigger}
				data-accessibility-trigger
				type="button"
				aria-label="Acessibilidade"
				aria-keyshortcuts="F"
				title="Acessibilidade (F)"
				aria-expanded={open}
				aria-controls={panelId}
				onClick={() => setOpen(!open)}
				className="relative flex items-center justify-center w-14 h-14 rounded-full bg-blue-700 text-white shadow-lg hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 smooth-transition"
			>
				<span
					aria-hidden="true"
					className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-md border border-white bg-blue-900 text-white text-xs font-bold"
				>
					F
				</span>
				<svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
					<circle cx="16" cy="16" r="13" fill="currentColor" />
					<circle cx="16" cy="9" r="2.2" fill="#1d4ed8" />
					<path
						d="M9 13l7 1.5 7-1.5M16 14.5v5M16 19.5l-3.5 6M16 19.5l3.5 6"
						fill="none"
						stroke="#1d4ed8"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>

			<section
				id={panelId}
				aria-label="Opções de acessibilidade"
				aria-hidden={!open}
				inert={!open}
				className={`absolute bottom-full right-0 mb-3 w-72 max-w-[calc(100vw-2rem)] max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-2xl border border-gray-light dark:border-gray-medium bg-card-light dark:bg-card-dark p-5 text-gray-dark dark:text-white shadow-lg transition-all duration-[var(--duration-default)] motion-reduce:transition-none ${open ? "visible opacity-100 translate-y-0" : "invisible opacity-0 translate-y-2 pointer-events-none"}`}
			>
				<div className="flex items-center justify-between gap-2 mb-4">
					<Text as="h2" variant="tomorrow-lg" className="min-w-0">
						Acessibilidade
					</Text>
					<button
						type="button"
						aria-label="Fechar acessibilidade"
						onClick={() => {
							setOpen(false);
							trigger.current?.focus();
						}}
						className="shrink-0 p-2 rounded-md hover:bg-black/10 dark:hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-blue-600"
					>
						<X size={20} aria-hidden="true" />
					</button>
				</div>

				<Text as="p" variant="tomorrow-sm" className="mb-3">
					Tamanho da fonte
					<span role="status" className="block mt-1">
						{fontSize}%
					</span>
				</Text>
				<div className="grid grid-cols-3 gap-2 mb-4">
					<button
						type="button"
						aria-label="Diminuir fonte"
						disabled={fontSize === 80}
						onClick={() => changeFontSize(-10)}
						className="rounded-md border border-gray-medium px-3 py-2 font-tomorrow text-lg hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-blue-600"
					>
						A−
					</button>
					<button
						type="button"
						aria-label="Aumentar fonte"
						disabled={fontSize === 200}
						onClick={() => changeFontSize(10)}
						className="rounded-md border border-gray-medium px-3 py-2 font-tomorrow text-lg hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-blue-600"
					>
						A+
					</button>
					<button
						type="button"
						aria-label="Restaurar fonte para 100%"
						onClick={() => setFontSize(100)}
						className="flex justify-center items-center rounded-md border border-gray-medium px-3 py-2 hover:bg-black/10 dark:hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-blue-600"
					>
						<RotateCcw size={20} aria-hidden="true" />
					</button>
				</div>

				<button
					type="button"
					role="switch"
					aria-checked={highContrast}
					onClick={() => setHighContrast(!highContrast)}
					className="flex items-center gap-2 w-full p-3 rounded-md border border-gray-medium text-left hover:bg-black/10 dark:hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-blue-600"
				>
					<Contrast size={20} className="shrink-0" aria-hidden="true" />
					<Text variant="tomorrow-sm">
						Alto contraste: {highContrast ? "ativado" : "desativado"}
					</Text>
				</button>
				<button
					type="button"
					role="switch"
					aria-checked={reducedMotion}
					onClick={() => setReducedMotion(!reducedMotion)}
					className="flex items-center gap-2 w-full mt-3 p-3 rounded-md border border-gray-medium text-left hover:bg-black/10 dark:hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-blue-600"
				>
					<Wind size={20} className="shrink-0" aria-hidden="true" />
					<Text variant="tomorrow-sm">
						Reduzir movimento: {reducedMotion ? "ativado" : "desativado"}
					</Text>
				</button>
			</section>
		</div>
	);
}
