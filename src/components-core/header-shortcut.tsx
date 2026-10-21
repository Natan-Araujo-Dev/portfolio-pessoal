import { Menu } from "lucide-react";
import Text from "../components-base/text";
import ButtonToggleTheme from "./button-toggle-theme";

export default function HeaderShortcuts() {
	return (
		<>
			<HeaderShortchutDesktop />
			<HeaderShortchutMobile />
		</>
	);
}

function HeaderShortchutDesktop() {
	return (
		<div
			className="
			hidden lg:flex
         flex-row
         justify-center items-center
         gap-x-4"
		>
			<Sections />
		</div>
	);
}

function HeaderShortchutMobile() {
	return (
		<div
			className="
			lg:hidden
			flex flex-col
			justify-start items-start"
		>
			<details className="mobile-navigation">
				<summary
					aria-label="Menu de navegação"
					className="absolute right-4 top-1/2 -translate-y-1/2 flex min-h-11 min-w-11 items-center justify-center rounded-lg list-none"
				>
					<Menu />
				</summary>

				<div
					className="absolute right-4 top-full mt-2 flex w-64 max-w-[calc(100vw-2rem)] flex-col gap-1 rounded-xl border border-slate-500/20 bg-card-light p-3 shadow-xl dark:bg-card-dark"
					onClick={(event) => {
						if ((event.target as HTMLElement).closest("a")) {
							event.currentTarget.closest("details")?.removeAttribute("open");
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

			<ButtonToggleTheme />
		</>
	);
}
