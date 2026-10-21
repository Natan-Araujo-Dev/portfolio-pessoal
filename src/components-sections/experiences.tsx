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
				<Text as="h2" variant="tomorrow-section">Experiência profissional</Text>
			</div>

			<div
				className="
				grid w-full max-w-6xl grid-cols-1 md:grid-cols-2
				items-start gap-5 sm:gap-6"
			>
				{experiencesList.map((experience) => (
					<CardSkill key={experience.title} skill={experience} prose />
				))}
			</div>

			<ButtonAdvance href="#habilidades" />
		</ScrollSection>
	);
}
