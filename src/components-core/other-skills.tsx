import Text from "../components-base/text";
import { otherSkillsList } from "../objects/otherSkillsList";
import ButtonAdvance from "./button-advance";
import CardSkill from "./card-skill";

export default function OtherSkills() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <ids estáticos>
		<div
			id="outras-habilidades"
			className="
			custom-section
         gap-y-10"
		>
			<div>
				<Text
					variant="tomorrow-4xl"
					className="font-medium text-green-dark dark:text-green-light"
				>
					Outras habilidades
				</Text>
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
