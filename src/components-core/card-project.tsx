import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import Text from "../components-base/text";
import type { ProjectModel } from "../models/projectModel";
import Tecnology from "./tecnology";
import HighlightedText from "./highlighted-text";
import useLanguage from "../hooks/useLanguage";
import sendWorkPreview from "../assets/experience-wall/mobile/sendwork-1.webp";

export default function CardProject({
	title, summary, features, technologies, projectLink, gitHubLink, gitHubLinks, index,
}: ProjectModel & { index: number }) {
	const { t } = useLanguage();
	const repositories = gitHubLinks ?? (gitHubLink ? [{ label: "GitHub", url: gitHubLink }] : []);
	const preview = title === "SendWork" ? sendWorkPreview : undefined;

	return (
		<details name="portfolio-projects" className="showcase-project">
			<summary className="showcase-project-row">
				<span className="showcase-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
				<span className="showcase-project-copy">
					<Text variant="tomorrow-xl" className="font-semibold">{title}</Text>
					<Text variant="tomorrow-sm">{summary}</Text>
					<span className="flex flex-wrap gap-2">
						{technologies.slice(0, 3).map(tech => <Tecnology key={tech} name={tech} />)}
					</span>
				</span>
				<span className="showcase-preview" aria-hidden="true">
					{preview ? <img src={preview} alt="" loading="lazy" decoding="async" /> : <span>{title}</span>}
				</span>
				<span className="showcase-arrow" aria-hidden="true"><ArrowUpRight size={20} /></span>
			</summary>
			<div className="showcase-project-details">
				{preview && <img className="showcase-project-image" src={preview} alt={title} loading="lazy" decoding="async" />}
				<Text as="h3" variant="tomorrow-sm" className="font-semibold">Minha atuação</Text>
				<ul className="card-list prose-text space-y-3 leading-relaxed">
					{features.map(feature => <li key={feature}><HighlightedText>{feature}</HighlightedText></li>)}
				</ul>
				<ul className="flex flex-wrap gap-2" aria-label={t("Tecnologias de {title}", { title })}>
					{technologies.map(tech => <li key={tech}><Tecnology name={tech} /></li>)}
				</ul>
				<div className="flex flex-wrap gap-3">
					{projectLink && (
						<a href={projectLink} target="_blank" rel="noopener noreferrer" className="project-link" aria-label={t("Ir para o site de {title} (nova guia)", { title })}>
							{t("Ir para o site")} <ExternalLink size={16} aria-hidden="true" />
						</a>
					)}
					{repositories.map(repository => (
						<a key={repository.url} href={repository.url} target="_blank" rel="noopener noreferrer" className="project-link" aria-label={t("{label} de {title} (nova guia)", { label: repository.label, title })}>
							{repository.label} <Github size={16} aria-hidden="true" />
						</a>
					))}
				</div>
			</div>
		</details>
	);
}
