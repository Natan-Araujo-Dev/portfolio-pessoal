import Background from "./background";
import Content from "./content";

export default function Main() {
	return (
		<main
			className="
			relative
			flex grow
			justify-center items-center
			w-full h-full
			bg-cyan-100"
		>
			<Background />

			<Content />
		</main>
	);
}
