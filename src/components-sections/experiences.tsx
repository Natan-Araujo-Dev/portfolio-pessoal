import ScrollSection from "../components-core/scroll-section";
import Text from "../components-base/text";
import ButtonAdvance from "../components-core/button-advance";
import CardSkill from "../components-core/card-skill";
import { experiencesList } from "../objects/experiencesList";

export default function Experiences() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <ids estáticos>
		<ScrollSection
			id="experiencia-profissional"
			className="
			custom-section
         gap-y-10"
		>
			<div>
				<Text variant="tomorrow-section">Experiência profissional</Text>
			</div>

			<div
				className="
				grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2
				gap-8"
			>
				{experiencesList.map((experience) => (
					<CardSkill key={experience.title} skill={experience} prose />
				))}
			</div>

			<ButtonAdvance href="#habilidades" />
		</ScrollSection>
	);
}
