import Text from "../components-base/text";
import { skillList } from "../objects/skillList";
import ButtonAdvance from "./button-advance";
import CardSkill from "./card-skill";

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
				<Text
					variant="tomorrow-4xl"
					className="font-medium text-green-dark dark:text-green-light"
				>
					Habilidades
				</Text>
			</div>

			<div
				className="
				grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
				gap-8"
			>
				{skillList.map((skill) => (
					<CardSkill key={skill.title} skill={skill} />
				))}
			</div>

			<ButtonAdvance href="#projetos" />
		</div>
	);
}
