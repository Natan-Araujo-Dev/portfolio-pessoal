import Text from "../components-base/text";
import ButtonAdvance from "../components-core/button-advance";
import CardSkill from "../components-core/card-skill";
import { otherSkillsList } from "../objects/otherSkillsList";

export default function OthersInfos() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <ids estáticos>
		<div
			id="outras-informacoes"
			className="
			custom-section
         gap-y-10"
		>
			<div>
				<Text variant="tomorrow-section">Outras informações</Text>
			</div>

			<div
				className="
				grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2
				gap-8"
			>
				{otherSkillsList.map((skill) => (
					<CardSkill key={skill.title} skill={skill} />
				))}
			</div>

			<ButtonAdvance href="#projetos" />
		</div>
	);
}
