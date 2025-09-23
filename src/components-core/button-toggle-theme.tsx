import useTheme from "../hooks/useTheme";

export default function ButtonToggleTheme() {
	const { darkMode, toggle } = useTheme();

	return (
		<div
			className="
			font-tomorrow"
		>
			<input
				type="button"
				value={`Tema ${darkMode ? "🌑" : "☀️"}`}
				onClick={toggle}
				className="
				px-[5px] py-[2px]
 				cursor-pointer
				border-2 rounded-md
				border-gray-400 dark:border-gray-500
				fill-color
				expand-lg"
			/>
		</div>
	);
}
