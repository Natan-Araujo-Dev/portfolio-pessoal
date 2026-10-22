import { useEffect, useRef } from "react";
import Text from "../components-base/text";
import HeaderShortcuts from "../components-core/header-shortcut";

export default function Header() {
	const header = useRef<HTMLElement>(null);

	useEffect(() => {
		const element = header.current;
		if (!element) return;

		const root = document.documentElement;
		const observer = new ResizeObserver(() => {
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

	return (
		<header
			ref={header}
			className="
			fixed top-0 left-0
			z-60
         flex flex-row flex-wrap
         justify-between items-center
         w-full min-h-(--header-height)
			p-4 lg:px-12
         text-gray-dark dark:text-white
		 bg-header-light dark:bg-gray-darker
			smooth-transition"
		>
			<div className="text-green-dark dark:text-green-light expand-sm">
				<a
					href="#inicio"
					className="inline-flex items-center -mx-2 -my-1 px-2 py-1 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-light"
				>
					<Text variant="tomorrow-header-name">Natan Araujo</Text>
				</a>
			</div>

			<HeaderShortcuts />
		</header>
	);
}
