import ScrollSection from "../components-core/scroll-section";
import Text from "../components-base/text";
import CardSkill from "../components-core/card-skill";
import { mainSkillsList } from "../objects/mainSkillsList";

export default function Skills() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <ids estáticos>
		<ScrollSection
			id="habilidades"
			className="
			custom-section
         gap-y-10"
		>
			<div>
				<Text as="h2" variant="tomorrow-section">Habilidades</Text>
			</div>

			<div
				className="
				grid w-full max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
				items-stretch gap-5 sm:gap-6"
			>
				{mainSkillsList.map((skill) => (
					<CardSkill key={skill.title} skill={skill} tags />
				))}
			</div>

		</ScrollSection>
	);
}
