import { useEffect, useState } from "react";
import { backgroundValues } from "../common/backgroundValues";

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

	useEffect(() => {
		const canvases =
			document.querySelectorAll<HTMLCanvasElement>("#finisher-canvas");

		if (canvases.length > 0) {
			if (darkMode === false) {
				canvases.forEach((canvas) => {
					canvas.style.backgroundColor = backgroundValues.backgroundColorLight;
				});
			} else {
				canvases.forEach((canvas) => {
					canvas.style.backgroundColor = backgroundValues.backgroundColorDark;
				});
			}
		}
	}, [darkMode]);

	return { darkMode, toggle };
}
