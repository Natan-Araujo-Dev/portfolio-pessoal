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
			<details
				className="
				flex flex-col
				justify-center items-center
				gap-y-4"
			>
				<summary
					className="
					cursor-pointer
					list-none
					min-h-(--header-height)
					p-4
					absolute right-0 top-1/2 -translate-y-1/2"
				>
					<Menu />
				</summary>

				<div
					className="
					absolute
					flex flex-col
					right-0 top-0
					mt-16
					gap-y-4
					p-2
					rounded-b-md
					bg-gray-dark/80 dark:bg-gray-darker/90"
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
