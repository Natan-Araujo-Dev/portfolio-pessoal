import { useEffect, useRef, useState } from "react";

export default function useTheme() {
	const transitionTimer = useRef<number | undefined>(undefined);
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

	useEffect(() => () => {
		window.clearTimeout(transitionTimer.current);
		document.documentElement.classList.remove("theme-transition");
	}, []);

	function toggle() {
		const root = document.documentElement;
		window.clearTimeout(transitionTimer.current);
		root.classList.add("theme-transition");
		transitionTimer.current = window.setTimeout(
			() => root.classList.remove("theme-transition"),
			250,
		);

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
