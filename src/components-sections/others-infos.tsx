import { useState } from "react";
import { ChevronRight } from "lucide-react";
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
						<li key={item}><Text variant="tomorrow-sm" className="prose-text"><HighlightedText>{item}</HighlightedText></Text></li>
					));
					return (
						<Card key={skill.title} className="profile-card flex min-w-0 flex-col gap-4 p-5 sm:p-7">
							<div className="flex items-start justify-between gap-3">
								<Text as="h3" variant="tomorrow-xl" className="card-heading">{skill.title}</Text>
								{soft && (
									<button
										className="-my-2 inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-green-dark hover:bg-emerald-900/10 focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-green-light dark:hover:bg-emerald-400/15"
										type="button"
										aria-label={t(expanded ? "Ver menos" : "Ver todas")}
										aria-expanded={expanded}
										onClick={() => setExpanded(value => !value)}
									>
										<ChevronRight size={20} className="profile-soft-chevron" aria-hidden="true" />
									</button>
								)}
							</div>
							{soft ? (
								<div>
									<ul className="card-list space-y-2">{entries.slice(0, 3)}</ul>
									<div className="profile-soft-extra" aria-hidden={!expanded}>
										<ul className="card-list space-y-2">{entries.slice(3)}</ul>
									</div>
								</div>
							) : <ul className={timeline ? "profile-timeline" : "card-list space-y-2"}>{entries}</ul>}
						</Card>
					);
				})}
			</div>
		</ScrollSection>
	);
}
