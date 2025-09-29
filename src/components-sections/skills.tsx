import Text from "../components-base/text";
import ButtonAdvance from "../components-core/button-advance";
import CardSkill from "../components-core/card-skill";
import { mainSkillsList } from "../objects/mainSkillsList";

export default function Skills() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <ids estáticos>
		<div
			id="habilidades"
			className="
			custom-section
         gap-y-10"
		>
			<div>
				<Text variant="tomorrow-section">Habilidades</Text>
			</div>

			<div
				className="
				grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
				gap-8"
			>
				{mainSkillsList.map((skill) => (
					<CardSkill key={skill.title} skill={skill} />
				))}
			</div>

			<ButtonAdvance href="#outras-habilidades" />
		</div>
	);
}
