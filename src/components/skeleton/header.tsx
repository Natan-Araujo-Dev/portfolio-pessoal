import ButtonToggleTheme from "../core/button-toggle-theme";
import HeaderShortcuts from "../core/header-shortcut";

export default function Header() {
	return (
		<header
			className="
			fixed top-0 left-0
			z-60
         flex flex-row
         justify-between items-center
         w-full h-(--header-height)
			p-4 px-12
         text-blue-400 dark:text-white
         bg-gray-700 dark:bg-gray-950
			smooth-transition"
		>
			<div className="text-green-400 text-3xl">
				<a href="#inicio">Natan Araujo</a>
			</div>
			<div
				className="
				flex flex-row
				justify-center items-center
				gap-x-8"
			>
				<HeaderShortcuts />

				<ButtonToggleTheme />
			</div>
		</header>
	);
}
