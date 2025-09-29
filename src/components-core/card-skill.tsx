import { Dot } from "lucide-react";
import Card from "../components-base/card";
import Text from "../components-base/text";
import type { SkillModel } from "../models/skillModel";

interface SkillProps {
	skill: SkillModel;
}

export default function CardSkill({ skill }: SkillProps) {
	return (
		<Card
			className="
			flex flex-col
			justify-between items-center
			w-80
			p-10
			text-black dark:text-white"
		>
			<div
				className="
				flex justify-center
				mb-10"
			>
				<Text
					variant="tomorrow-xl"
					className="text-blue-700 dark:text-blue-400"
				>
					{skill.title}
				</Text>
			</div>

			<div
				className="
				flex flex-col
				justify-center items-start
				h-full w-full"
			>
				{skill.skills.map((skill) => (
					<Text key={skill} variant="tomorrow-sm">
						<div className="flex flex-row">
							<Dot /> {skill}
						</div>
					</Text>
				))}
			</div>
		</Card>
	);
}
