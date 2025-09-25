/** biome-ignore-all lint/correctness/useUniqueElementIds: <ids estáticos> */
import About from "../components-core/about";
import Projects from "../components-core/projects";
import Skills from "../components-core/skills";
import Start from "../components-core/start";

export default function Content() {
	return (
		<div
			className="
         flex flex-col
         justify-center items-center
         w-full h-full
         z-50
			mx-20
			gap-y-20
			text-white"
		>
			<Start />

			<About />

			<Skills />

			<Projects />
		</div>
	);
}
