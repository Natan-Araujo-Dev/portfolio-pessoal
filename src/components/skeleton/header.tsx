import ButtonToggleTheme from "../core/button-toggle-theme";

export default function Header() {
	return (
		<header
			className="
			fixed top-0 left-0
			z-60
         flex flex-row
         justify-between items-center
         w-full h-14
			p-4
         text-blue-400 dark:text-white
         bg-gray-700 dark:bg-gray-950
			smooth-transition"
		>
			<div>Natan Araujo</div>
			<div>
				<ButtonToggleTheme />
			</div>
		</header>
	);
}
