import ScrollSection from "../components-core/scroll-section";
import Text from "../components-base/text";
import ButtonAdvance from "../components-core/button-advance";
import CardProject from "../components-core/card-project";
import { projectsList } from "../objects/projectsList";

export default function About() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <ids estáticos>
		<ScrollSection
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
				justify-center items-start
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
						gitHubLinks={proj.gitHubLinks}
					/>
				))}
			</div>

			<ButtonAdvance href="#contato" />
		</ScrollSection>
	);
}
