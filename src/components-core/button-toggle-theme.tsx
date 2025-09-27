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
				flex
				justify-between
				px-[5px] py-[2px]
 				cursor-pointer
				border-2 rounded-md
				border-gray-light dark:border-gray-medium
				fill-color
				expand-l
				gap-x-1"
			>
				<div>
					<Text variant="tomorrow-header-shortcut">Tema</Text>
				</div>
				<div>{darkMode ? <Moon /> : <Sun />}</div>
			</button>
		</div>
	);
}
