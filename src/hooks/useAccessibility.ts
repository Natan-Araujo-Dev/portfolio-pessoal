import { useEffect, useState } from "react";

export default function useAccessibility() {
	const [fontSize, setFontSize] = useState(() => {
		const saved = Number(localStorage.getItem("accessibilityFontSize"));
		return saved >= 80 && saved <= 200 ? saved : 100;
	});
	const [highContrast, setHighContrast] = useState(
		() => localStorage.getItem("accessibilityHighContrast") === "true",
	);
	const [reducedMotion, setReducedMotion] = useState(() => {
		const saved = localStorage.getItem("accessibilityReducedMotion");
		return saved === null
			? window.matchMedia("(prefers-reduced-motion: reduce)").matches
			: saved === "true";
	});

	useEffect(() => {
		document.documentElement.style.setProperty(
			"--accessibility-font-scale",
			String(fontSize / 100),
		);
		document.documentElement.classList.toggle("high-contrast", highContrast);
		document.documentElement.classList.toggle("reduced-motion", reducedMotion);
		localStorage.setItem("accessibilityFontSize", String(fontSize));
		localStorage.setItem("accessibilityHighContrast", String(highContrast));
		localStorage.setItem("accessibilityReducedMotion", String(reducedMotion));
	}, [fontSize, highContrast, reducedMotion]);

	function changeFontSize(amount: number) {
		setFontSize((current) => Math.min(200, Math.max(80, current + amount)));
	}

	return {
		fontSize,
		changeFontSize,
		setFontSize,
		highContrast,
		setHighContrast,
		reducedMotion,
		setReducedMotion,
	};
}
