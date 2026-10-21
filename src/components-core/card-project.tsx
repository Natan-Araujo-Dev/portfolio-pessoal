import { Dot, ExternalLink, Github } from "lucide-react";
import Card from "../components-base/card";
import Text from "../components-base/text";
import type { ProjectModel } from "../models/projectModel";
import Tecnology from "./tecnology";
import HighlightedText from "./highlighted-text";

interface CardProps extends ProjectModel {}

export default function CardProject({
	title,
	summary,
	features,
	technologies,
	projectLink,
	gitHubLink,
	gitHubLinks,
}: CardProps) {
	const repositories =
		gitHubLinks ?? (gitHubLink ? [{ label: "GitHub", url: gitHubLink }] : []);

	return (
		<Card
			className="
         flex flex-col
         justify-between items-center
         w-80 min-h-100
         p-6
         gap-y-2
         text-black dark:text-white"
		>
			<div className="flex flex-col gap-y-3">
				<div className="flex justify-center mb-6 items-center">
					<Text variant="tomorrow-xl" className="title-shadow text-[#569CD6]">
						{title}
					</Text>
				</div>

				<div className="flex justify-start items-center w-full">
					<Text variant="cascadia-prose">
						<HighlightedText>{summary}</HighlightedText>
					</Text>
				</div>

				<div
					className="
               flex flex-col
               justify-center items-start
               gap-y-1"
				>
					<Text variant="tomorrow-sm">Minha atuação:</Text>
					{features.map((feat) => (
						<Text variant="cascadia-prose" key={feat}>
							<div className="flex flex-row">
								<Dot className="shrink-0 text-[#569CD6]" />{" "}
								<span>
									<HighlightedText>{feat}</HighlightedText>
								</span>
							</div>
						</Text>
					))}
				</div>
			</div>

			<div className="flex flex-col gap-y-2">
				<div className="flex flex-wrap justify-start gap-2 py-2">
					{technologies.map((tec) => (
						<Tecnology name={tec} key={tec} />
					))}
				</div>

				<div className="flex justify-center items-center w-full gap-x-2">
					{repositories.map((repository) => (
						<div
							key={repository.url}
							className="
                  bg-gray-light dark:bg-gray-dark
                  rounded-md"
						>
							<a
								href={repository.url}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex justify-center items-center gap-2 px-2 py-1.5"
							>
								<Text variant="tomorrow-sm-extralight">{repository.label}</Text>
								<Github className="w-5 h-5 shrink-0 text-gray-700 dark:text-gray-light" />
							</a>
						</div>
					))}

					{projectLink && (
						<div
							className="
                     bg-gray-light dark:bg-gray-dark
                     rounded-md"
						>
							<a
								href={projectLink}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex justify-center items-center gap-2 px-2 py-1.5"
							>
								<Text variant="tomorrow-sm-extralight">Ir para o site</Text>
								<ExternalLink className="w-5 h-5 shrink-0 text-gray-700 dark:text-gray-light" />
							</a>
						</div>
					)}
				</div>
			</div>
		</Card>
	);
}
