import { Menu } from "lucide-react";
import { useEffect, useRef } from "react";
import Text from "../components-base/text";
import ButtonToggleTheme from "./button-toggle-theme";
import LanguageSelector from "./language-selector";
import useLanguage from "../hooks/useLanguage";

export default function HeaderShortcuts({ compact = false }: { compact?: boolean }) {
	return (
		<>
			<HeaderShortchutDesktop compact={compact} />
			<HeaderShortchutMobile compact={compact} />
		</>
	);
}

function HeaderShortchutDesktop({ compact }: { compact: boolean }) {
	return (
		<div
			data-header-desktop
			inert={compact}
			className="
			hidden xl:flex
         flex-row
         justify-center items-center
         gap-x-4"
		>
			<Sections />
		</div>
	);
}

function HeaderShortchutMobile({ compact }: { compact: boolean }) {
	const { t } = useLanguage();
	const details = useRef<HTMLDetailsElement>(null);
	const panel = useRef<HTMLDivElement>(null);
	const animation = useRef<Animation | null>(null);
	const expanded = useRef(false);

	useEffect(() => () => animation.current?.cancel(), []);

	function setMenuOpen(open: boolean) {
		const menu = details.current;
		const content = panel.current;
		if (!menu || !content) return;
		const current = getComputedStyle(content);
		const hidden = { height: "0px", paddingTop: "0px", paddingBottom: "0px", opacity: "0" };
		const from = menu.open
			? { height: current.height, paddingTop: current.paddingTop, paddingBottom: current.paddingBottom, opacity: current.opacity }
			: hidden;
		animation.current?.cancel();
		expanded.current = open;
		if (matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.classList.contains("reduced-motion")) {
			menu.open = open;
			return;
		}
		menu.open = true;
		const natural = getComputedStyle(content);
		const shown = { height: natural.height, paddingTop: natural.paddingTop, paddingBottom: natural.paddingBottom, opacity: "1" };
		const transition = content.animate([from, open ? shown : hidden], {
			duration: 200, easing: "cubic-bezier(0.215, 0.61, 0.355, 1)", fill: "both",
		});
		animation.current = transition;
		transition.onfinish = () => {
			menu.open = open;
			transition.cancel();
			animation.current = null;
		};
	}

	return (
		<div
			className={`${compact ? "" : "xl:hidden"}
			flex flex-col
			justify-start items-start`}
		>
			<details ref={details} className="mobile-navigation">
				<summary
					aria-label={t("Menu de navegação")}
					onClick={event => { event.preventDefault(); setMenuOpen(!expanded.current); }}
					className={`absolute ${compact ? "right-0" : "right-4"} top-1/2 -translate-y-1/2 flex min-h-11 min-w-11 items-center justify-center rounded-lg list-none`}
				>
					<Menu />
				</summary>

				<div
					ref={panel}
					className={`absolute ${compact ? "right-0" : "right-4"} top-full mt-2 flex w-64 max-w-[calc(100vw-2rem)] flex-col gap-1 overflow-hidden rounded-xl border border-slate-500/20 bg-card-light p-3 shadow-xl dark:bg-card-dark`}
					onClick={(event) => {
						if ((event.target as HTMLElement).closest("a")) {
							setMenuOpen(false);
						}
					}}
				>
					<Sections />
				</div>
			</details>
		</div>
	);
}

function Sections() {
	return (
		<>
			<div className="expand-lg fill-color">
				<a href="#sobre">
					<Text variant="tomorrow-header-shortcut">Sobre</Text>
				</a>
			</div>

			<div className="expand-lg fill-color">
				<a href="#experiencia-profissional">
					<Text variant="tomorrow-header-shortcut">Experiência</Text>
				</a>
			</div>

			<div className="expand-lg fill-color">
				<a href="#habilidades">
					<Text variant="tomorrow-header-shortcut">Habilidades</Text>
				</a>
			</div>

			<div className="expand-lg fill-color">
				<a href="#outras-informacoes">
					<Text variant="tomorrow-header-shortcut">Outras informações</Text>
				</a>
			</div>

			<div className="expand-lg fill-color">
				<a href="#projetos">
					<Text variant="tomorrow-header-shortcut">Projetos</Text>
				</a>
			</div>

			<div className="expand-lg fill-color">
				<a href="#contato">
					<Text variant="tomorrow-header-shortcut">Contato</Text>
				</a>
			</div>

			<div className="header-controls flex items-center gap-3">
				<ButtonToggleTheme />
				<LanguageSelector />
			</div>
		</>
	);
}
