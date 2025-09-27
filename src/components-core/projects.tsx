import Text from "../components-base/text";
import { projectList } from "../objects/projectList";
import ButtonAdvance from "./button-advance";
import CardProject from "./card-project";

export default function About() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <ids estáticos>
		<div
			id="projetos"
			className="
			custom-section
         gap-y-10"
		>
			<div>
				<Text
					variant="tomorrow-4xl"
					className="font-medium text-green-dark dark:text-green-light"
				>
					Projetos em destaque
				</Text>
			</div>

			<div
				className="
				flex flex-row
				justify-center items-center
				gap-8"
			>
				{projectList.map((proj) => (
					<CardProject
						key={proj.title}
						title={proj.title}
						summary={proj.summary}
						features={proj.features}
						technologies={proj.technologies}
						projectLink={proj.projectLink}
						gitHubLink={proj.gitHubLink}
					/>
				))}
			</div>

			<ButtonAdvance href="#contato" />
		</div>
	);
}
