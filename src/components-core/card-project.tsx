import { ChevronRight, ExternalLink, Github } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import Text from "../components-base/text";
import type { ProjectModel } from "../models/projectModel";
import Tecnology from "./tecnology";
import HighlightedText from "./highlighted-text";
import useLanguage from "../hooks/useLanguage";

const AccordionGallery = lazy(() => import("./accordion-gallery"));

export default function CardProject({
	title, summary, features, technologies, images, projectLink, gitHubLink, gitHubLinks, index, onToggleRequest,
}: ProjectModel & { index: number; onToggleRequest: (card: HTMLDetailsElement) => void }) {
	const { t } = useLanguage();
	const [open, setOpen] = useState(false);
	const repositories = gitHubLinks ?? (gitHubLink ? [{ label: "GitHub", url: gitHubLink }] : []);
	const preview = images?.[0];

	return (
		<details className="showcase-project" onToggle={event => setOpen(event.currentTarget.open)}>
			<summary className="showcase-project-row" onClick={event => {
				event.preventDefault();
				const card = event.currentTarget.parentElement;
				if (card instanceof HTMLDetailsElement) onToggleRequest(card);
			}}>
				<span className="showcase-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
				<span className="showcase-project-copy">
					<Text variant="tomorrow-xl" className="font-semibold">{title}</Text>
					<Text variant="tomorrow-sm">{summary}</Text>
					<span className="flex flex-wrap gap-2">
						{technologies.slice(0, 3).map(tech => <Tecnology key={tech} name={tech} />)}
					</span>
				</span>
				<span className="showcase-preview" aria-hidden="true">
					{preview ? <img src={preview.image} alt="" loading="lazy" decoding="async" /> : <span>{title}</span>}
				</span>
				<span className="showcase-arrow" aria-hidden="true"><ChevronRight size={20} /></span>
			</summary>
			<div className="showcase-project-details">
				{preview && images && (
					<div className="showcase-project-gallery">
						{open && <Suspense fallback={<img src={preview.image} alt={t(preview.label)} className="h-full w-full rounded-[5px] object-cover" />}>
							<AccordionGallery
								items={images.map(item => ({ ...item, label: t(item.label) }))}
								label={t("Imagens de {title}", { title })}
								defaultIndex={0}
								gap={12}
								tilt={0}
								radius={5}
								stagger={0}
								expandRatio={0.64}
								duration={0.3}
							/>
						</Suspense>}
					</div>
				)}
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
