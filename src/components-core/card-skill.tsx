import Card from "../components-base/card";
import Text from "../components-base/text";
import type { SkillModel } from "../models/skillModel";
import HighlightedText from "./highlighted-text";
import Tecnology from "./tecnology";
import ExpandableCardContent from "./expandable-card-content";

interface SkillProps {
	skill: SkillModel;
	prose?: boolean;
	tags?: boolean;
	columns?: boolean;
}

export default function CardSkill({ skill, prose = false, tags = false, columns = false }: SkillProps) {
	const visibleSkills = prose ? skill.skills.slice(0, 2) : skill.skills;
	const moreSkills = prose ? skill.skills.slice(2) : [];

	return (
		<Card className="flex w-full min-w-0 flex-col gap-5 p-6 sm:p-8 text-gray-dark dark:text-gray-200">
			<Text as="h3" variant="tomorrow-xl" className="card-heading">{skill.title}</Text>
			<ul className={tags ? "flex flex-wrap gap-2" : columns ? "card-list grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-4 lg:grid-cols-3" : "card-list space-y-3"}>
				{visibleSkills.map((item) => (
					<li key={item}>
						{tags ? <Tecnology name={item} /> : (
							<Text variant={prose ? "cascadia-prose" : "tomorrow-sm"} className="leading-relaxed">
								<HighlightedText>{item}</HighlightedText>
							</Text>
						)}
					</li>
				))}
			</ul>
			{moreSkills.length > 0 && (
				<ExpandableCardContent label="Mais sobre minha atuação" ariaLabel={`Mais sobre minha atuação na ${skill.title}`}>
					<ul className="card-list prose-text mt-4 space-y-3 text-base leading-relaxed">
						{moreSkills.map((item) => (
							<li key={item}><HighlightedText>{item}</HighlightedText></li>
						))}
					</ul>
				</ExpandableCardContent>
			)}
		</Card>
	);
}
