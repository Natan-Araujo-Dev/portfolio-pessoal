import Background from "./background";
import Content from "./content";

export default function MainContent() {
	return (
		<main
			className="
			relative
			flex flex-col grow
			justify-center items-center
			w-full h-full
			mt-(--header-height)
			bg-cyan-100"
		>
			<Background />
			<Content />
		</main>
	);
}
