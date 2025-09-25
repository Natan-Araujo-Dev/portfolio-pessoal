import Text from "../components-base/text";
import ButtonToggleTheme from "../components-core/button-toggle-theme";
import HeaderShortcuts from "../components-core/header-shortcut";

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
         text-white
         bg-gray-dark/80 dark:bg-gray-darker/90
			smooth-transition"
		>
			<div className="text-green-light expand-sm">
				<a href="#inicio">
					<Text variant="tomorrow-header-name">Natan Araujo</Text>
				</a>
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
