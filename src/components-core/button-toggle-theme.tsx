import { Moon, Sun } from "lucide-react";
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
				inline-flex
				justify-center items-center
				px-2 py-1
				text-base
 				cursor-pointer
				border-2 rounded-md
				border-gray-light dark:border-gray-medium
				fill-color
				expand-lg
				gap-x-2"
			>
				<Text variant="tomorrow-header-shortcut" className="leading-none">
					Tema
				</Text>
				{darkMode ? (
					<Moon size="1em" className="shrink-0" />
				) : (
					<Sun size="1em" className="shrink-0" />
				)}
			</button>
		</div>
	);
}
