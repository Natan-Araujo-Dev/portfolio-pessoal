import { useEffect, useRef, useState } from "react";
import Text from "../components-base/text";
import HeaderShortcuts from "../components-core/header-shortcut";

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

	useEffect(() => {
		const onScroll = () => {
			const height = Number.parseFloat(document.documentElement.style.getPropertyValue("--header-height")) || 60;
			setCompact(window.scrollY > Math.max(height, 240));
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
		};
	}, []);

	return (
		<header
			ref={header}
			data-compact={compact}
			className="
			fixed top-0 right-0
			z-60
         flex flex-row flex-nowrap
         justify-between items-center
         w-full min-h-(--header-height)
			p-4 lg:px-12
         text-gray-dark dark:text-white
		 bg-header-light dark:bg-gray-darker
			transition-[width,min-height,padding,top,right,border-radius,background-color,color,box-shadow] duration-300 ease-out motion-reduce:transition-none"
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
