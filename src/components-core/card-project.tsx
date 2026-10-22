import { ExternalLink, Github } from "lucide-react";
import Card from "../components-base/card";
import Text from "../components-base/text";
import type { ProjectModel } from "../models/projectModel";
import Tecnology from "./tecnology";
import HighlightedText from "./highlighted-text";
import ExpandableCardContent from "./expandable-card-content";
import useLanguage from "../hooks/useLanguage";

export default function CardProject({
	title, summary, features, technologies, projectLink, gitHubLink, gitHubLinks,
}: ProjectModel) {
	const { t } = useLanguage();
	const repositories =
		gitHubLinks ?? (gitHubLink ? [{ label: "GitHub", url: gitHubLink }] : []);

	return (
		<Card className="flex w-full min-w-0 flex-col gap-5 p-6 sm:p-8 text-gray-dark dark:text-gray-200">
			<Text as="h3" variant="tomorrow-xl" className="card-heading">{title}</Text>
			<Text as="p" variant="cascadia-prose">
				<HighlightedText>{summary}</HighlightedText>
			</Text>

			<ul className="flex flex-wrap gap-2" aria-label={t("Tecnologias de {title}", { title })}>
				{technologies.slice(0, 5).map((tec) => (
					<li key={tec}><Tecnology name={tec} /></li>
				))}
			</ul>

			<ExpandableCardContent label="Minha atuação" ariaLabel={t("Minha atuação em {title}", { title })}>
				<ul className="card-list prose-text mt-4 space-y-3 text-base leading-relaxed">
					{features.map((feature) => (
						<li key={feature}><HighlightedText>{feature}</HighlightedText></li>
					))}
				</ul>
				{technologies.length > 5 && (
					<div className="mt-5">
						<Text as="p" variant="tomorrow-sm" className="mb-2">Outras tecnologias</Text>
						<ul className="flex flex-wrap gap-2">
							{technologies.slice(5).map((tec) => (
								<li key={tec}><Tecnology name={tec} /></li>
							))}
						</ul>
					</div>
				)}
			</ExpandableCardContent>

			<div className="flex flex-wrap items-center gap-3">
				{projectLink && (
					<a href={projectLink} target="_blank" rel="noopener noreferrer" className="project-link" aria-label={t("Ir para o site de {title} (nova guia)", { title })}>
						{t("Ir para o site")} <ExternalLink size={16} aria-hidden="true" />
					</a>
				)}
				{repositories.map((repository) => (
					<a key={repository.url} href={repository.url} target="_blank" rel="noopener noreferrer" className="project-link" aria-label={t("{label} de {title} (nova guia)", { label: repository.label, title })}>
						{repository.label} <Github size={16} aria-hidden="true" />
					</a>
				))}
			</div>
		</Card>
	);
}
