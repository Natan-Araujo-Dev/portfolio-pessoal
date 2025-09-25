import Text from "../components-base/text";
import useTheme from "../hooks/useTheme";

export default function ButtonToggleTheme() {
	const { darkMode, toggle } = useTheme();

	return (
		<div>
			<button
				type="button"
				onClick={toggle}
				className="
				px-[5px] py-[2px]
 				cursor-pointer
				border-2 rounded-md
				border-gray-light dark:border-gray-medium
				fill-color
				expand-lg"
			>
				<Text variant="tomorrow-header-shortcut">
					Tema {darkMode ? "🌑" : "☀️"}
				</Text>
			</button>
		</div>
	);
}
