import { useState } from "react";

export default function useTheme() {
	const [darkMode, setDarkMode] = useState(() => {
		const darkModeInStorage = localStorage.getItem("darkMode");

		if (darkModeInStorage === "false") {
			document.documentElement.classList.remove("dark");
			return false;
		} else {
			if (darkModeInStorage === null) {
				localStorage.setItem("darkMode", "true");
			}
			document.documentElement.classList.add("dark");
			return true;
		}
	});

	function toggle() {
		setDarkMode((prev) => {
			const newValue = !prev;

			localStorage.setItem("darkMode", newValue.toString());

			if (newValue) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}

			return newValue;
		});
	}

	return { darkMode, toggle };
}
