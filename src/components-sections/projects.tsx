import Text from "../components-base/text";
import ButtonAdvance from "../components-core/button-advance";
import CardProject from "../components-core/card-project";
import { projectsList } from "../objects/projectsList";

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
				<Text variant="tomorrow-section">Projetos em destaque</Text>
			</div>

			<div
				className="
				flex flex-row flex-wrap
				justify-center items-center
				gap-8"
			>
				{projectsList.map((proj) => (
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
