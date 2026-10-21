import Card from "../components-base/card";
import Text from "../components-base/text";
import type { SkillModel } from "../models/skillModel";
import HighlightedText from "./highlighted-text";

interface SkillProps {
	skill: SkillModel;
	prose?: boolean;
}

export default function CardSkill({ skill, prose = false }: SkillProps) {
	return (
		<Card
			className="
			flex flex-col
			justify-start items-center
			w-80
			p-10
			text-gray-dark dark:text-gray-200"
		>
			<div
				className="
				flex justify-center
				mb-6 text-center"
			>
				<Text variant="tomorrow-xl" className="title-shadow text-[#245b91] dark:text-[#569CD6]">
					{skill.title}
				</Text>
			</div>

			<ul
				className="
				flex flex-col
				items-start
				w-full gap-y-3"
			>
				{skill.skills.map((skill) => (
					<li key={skill} className="flex items-start gap-x-3">
						<span
							aria-hidden="true"
							className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#245b91] dark:bg-[#569CD6]"
						/>
						<Text
							as="span"
							variant={prose ? "cascadia-prose" : "tomorrow-sm"}
							className="leading-relaxed"
						>
							<HighlightedText>{skill}</HighlightedText>
						</Text>
					</li>
				))}
			</ul>
		</Card>
	);
}
