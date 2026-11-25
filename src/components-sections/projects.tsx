import ScrollSection from "../components-core/scroll-section";
import Text from "../components-base/text";
import CardProject from "../components-core/card-project";
import useProjectDisclosure from "../hooks/useProjectDisclosure";
import { projectsList } from "../objects/projectsList";
import "./portfolio-showcase.css";

export default function Projects() {
	const toggleProject = useProjectDisclosure();
	return (
		<ScrollSection id="projetos" className="custom-section gap-y-10" overlapTarget="contato">
			<div data-focus-reveal>
				<Text as="h2" variant="tomorrow-section" className="max-sm:text-3xl sm:max-md:text-4xl">Projetos em destaque</Text>
			</div>
			<div className="project-showcase w-full max-w-6xl">
				{projectsList.map((project, index) => (
					<CardProject key={project.title} {...project} index={index} onToggleRequest={toggleProject} />
				))}
			</div>
		</ScrollSection>
	);
}
