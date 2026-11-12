import { useState } from "react";
import { RotateCcw } from "lucide-react";
import ScrollSection from "../components-core/scroll-section";
import Text from "../components-base/text";
import Card from "../components-base/card";
import HighlightedText from "../components-core/highlighted-text";
import { otherSkillsList } from "../objects/otherSkillsList";
import useLanguage from "../hooks/useLanguage";
import "./portfolio-showcase.css";

export default function OthersInfos() {
	const [expanded, setExpanded] = useState(false);
	const { t } = useLanguage();

	return (
		<ScrollSection id="outras-informacoes" className="custom-section gap-y-10">
			<div><Text as="h2" variant="tomorrow-section">Outras informações</Text></div>
			<div className="grid w-full max-w-6xl grid-cols-1 gap-5 md:grid-cols-2">
				{otherSkillsList.map(skill => {
					const soft = skill.title === "Soft skills";
					const timeline = skill.title === "Educação" || skill.title === "Cursos";
					const entries = skill.skills.map(item => (
						<li key={item}><Text variant="tomorrow-sm"><HighlightedText>{item}</HighlightedText></Text></li>
					));
					return (
						<Card key={skill.title} className="profile-card flex min-w-0 flex-col gap-4 p-5 sm:p-7">
							<Text as="h3" variant="tomorrow-xl" className="card-heading">{skill.title}</Text>
							{soft ? (
								<div className="profile-soft" data-expanded={expanded}>
									<ul className="card-list space-y-2" aria-hidden={expanded}>{entries.slice(0, 3)}</ul>
									<ul className="card-list space-y-2" aria-hidden={!expanded}>{entries}</ul>
								</div>
							) : <ul className={timeline ? "profile-timeline" : "card-list space-y-2"}>{entries}</ul>}
							{soft && (
								<button className="project-link self-start" type="button" aria-expanded={expanded} onClick={() => setExpanded(value => !value)}>
									{t(expanded ? "Ver menos" : "Ver todas")} <RotateCcw size={14} aria-hidden="true" />
								</button>
							)}
						</Card>
					);
				})}
			</div>
		</ScrollSection>
	);
}
