import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Text from "../components-base/text";
import HeaderShortcuts from "../components-core/header-shortcut";
import { getNextScrollSection } from "../components-core/scroll-section-target";

export default function Header() {
	const header = useRef<HTMLElement>(null);
	const [compact, setCompact] = useState(false);

	useEffect(() => {
		const element = header.current;
		if (!element) return;

		const root = document.documentElement;
		const observer = new ResizeObserver(() => {
			if (element.dataset.compact === "true" || element.offsetWidth < root.clientWidth) return;
			root.style.setProperty(
				"--header-height",
				`${Math.ceil(element.getBoundingClientRect().height)}px`,
			);
		});
		observer.observe(element);
		return () => {
			observer.disconnect();
			root.style.removeProperty("--header-height");
		};
	}, []);

	useLayoutEffect(() => {
		const about = document.getElementById("sobre");
		const panel = about?.querySelector(".scroll-panel");
		if (!about || !panel) return;

		const next = getNextScrollSection(about);
		const viewport = window.visualViewport;

		const updateCompact = () => {
			const top = viewport?.offsetTop ?? 0;
			const bottom = top + (viewport?.height ?? window.innerHeight);
			const bounds = panel.getBoundingClientRect();
			const coversViewport = bounds.top <= top + 0.5 && bounds.bottom >= bottom - 0.5;
			const passedAbout = next !== null && next.getBoundingClientRect().top <= top + 0.5;
			setCompact(coversViewport || passedAbout);
		};
		const observer = new ResizeObserver(updateCompact);
		observer.observe(about);
		const home = document.getElementById("inicio");
		if (home) observer.observe(home);
		updateCompact();
		window.addEventListener("scroll", updateCompact, { passive: true });
		window.addEventListener("resize", updateCompact);
		viewport?.addEventListener("scroll", updateCompact, { passive: true });
		viewport?.addEventListener("resize", updateCompact);
		return () => {
			observer.disconnect();
			window.removeEventListener("scroll", updateCompact);
			window.removeEventListener("resize", updateCompact);
			viewport?.removeEventListener("scroll", updateCompact);
			viewport?.removeEventListener("resize", updateCompact);
		};
	}, []);

	return (
		<header
			ref={header}
			data-compact={compact}
			className={`
			fixed top-0 right-0
			z-65
         flex flex-row flex-nowrap
         justify-between items-center
         w-full min-h-(--header-height)
			p-4 lg:px-12
         text-gray-dark dark:text-white
			${compact ? "bg-transparent" : "bg-header-light dark:bg-gray-darker"}
			transition-[width,min-height,padding,top,right,background-color,color] duration-300 ease-out motion-reduce:transition-none`}
		>
			<div data-header-name inert={compact} className="text-green-dark dark:text-green-light expand-sm">
				<a
					href="#inicio"
					className="inline-flex items-center -mx-2 -my-1 px-2 py-1 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-light"
				>
					<Text variant="tomorrow-header-name">Natan Araujo</Text>
				</a>
			</div>

			<HeaderShortcuts compact={compact} />
		</header>
	);
}
