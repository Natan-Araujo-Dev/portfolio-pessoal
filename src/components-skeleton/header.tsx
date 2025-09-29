import Text from "../components-base/text";
import HeaderShortcuts from "../components-core/header-shortcut";

export default function Header() {
	return (
		<header
			className="
			fixed top-0 left-0
			z-60
         flex flex-row flex-wrap
         justify-between items-center
         w-full min-h-(--header-height)
			p-4 lg:px-12
         text-white
         bg-gray-dark/80 dark:bg-gray-darker/90
			backdrop-blur-xs
			smooth-transition"
		>
			<div className="text-green-light expand-sm">
				<a href="#inicio">
					<Text variant="tomorrow-header-name">Natan Araujo</Text>
				</a>
			</div>

			<HeaderShortcuts />
		</header>
	);
}
