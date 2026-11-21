import Card from "../components-base/card";
import Text from "../components-base/text";
import type { SkillModel } from "../models/skillModel";
import useLanguage from "../hooks/useLanguage";
import HighlightedText from "./highlighted-text";
import ExperienceScroll from "./experience-scroll";

export default function ExperiencePixelCard({ skill }: { skill: SkillModel }) {
	const { t } = useLanguage();
	return (
		<Card className="flex w-full min-w-0 flex-col gap-5 p-6 sm:p-8 text-gray-dark dark:text-gray-200">
			<Text as="h3" variant="tomorrow-xl" className="card-heading">{skill.title}</Text>
			<ExperienceScroll label={t(skill.title)}>
				<ul className="card-list prose-text space-y-3 text-base leading-relaxed">
					{skill.skills.map(item => <li key={item}><HighlightedText>{item}</HighlightedText></li>)}
				</ul>
			</ExperienceScroll>
		</Card>
	);
}
