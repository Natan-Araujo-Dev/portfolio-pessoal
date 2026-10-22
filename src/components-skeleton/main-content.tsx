import Content from "./content";

export default function MainContent() {
	return (
		<main
			className="
			relative
			flex flex-col grow
			justify-center items-center
			w-full h-full
			bg-gray-background dark:bg-blue-background"
		>
			<Content />
		</main>
	);
}
