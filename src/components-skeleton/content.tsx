/** biome-ignore-all lint/correctness/useUniqueElementIds: <ids estáticos> */
import About from "../components-sections/about";
import Experiences from "../components-sections/experiences";
import OthersInfos from "../components-sections/others-infos";
import Projects from "../components-sections/projects";
import Skills from "../components-sections/skills";
import Start from "../components-sections/start";

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
			text-gray-dark dark:text-white"
		>
			<Start />

			<About />

			<Experiences />

			<Skills />

			<OthersInfos />

			<Projects />
		</div>
	);
}
