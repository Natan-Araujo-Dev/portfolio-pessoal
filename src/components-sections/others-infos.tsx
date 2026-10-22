import ScrollSection from "../components-core/scroll-section";
import Text from "../components-base/text";
import CardSkill from "../components-core/card-skill";
import { otherSkillsList } from "../objects/otherSkillsList";

export default function OthersInfos() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <ids estáticos>
		<ScrollSection
			id="outras-informacoes"
			className="
			custom-section
         gap-y-10"
		>
			<div>
				<Text as="h2" variant="tomorrow-section">Outras informações</Text>
			</div>

			<div
				className="
				grid w-full max-w-6xl grid-cols-1 md:grid-cols-2
				items-start gap-5 sm:gap-6"
			>
				{otherSkillsList.map((skill) => (
					<CardSkill key={skill.title} skill={skill} columns={skill.title === "Soft skills"} />
				))}
			</div>

		</ScrollSection>
	);
}
