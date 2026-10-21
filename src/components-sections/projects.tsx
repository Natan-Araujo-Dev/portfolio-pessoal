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
				<Text as="h2" variant="tomorrow-section">Projetos em destaque</Text>
			</div>

			<div
				className="
				grid w-full max-w-6xl grid-cols-1 md:grid-cols-2
				items-start gap-5 sm:gap-6"
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
