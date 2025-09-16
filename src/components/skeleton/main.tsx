import Background from "./background";
import Content from "./content";

export default function Main() {
	return (
		<main
			className="
			relative
			flex flex-col grow
			justify-center items-center
			w-full h-full
			mt-14
			bg-cyan-100"
		>
			<Background />
			<Content />
		</main>
	);
}
