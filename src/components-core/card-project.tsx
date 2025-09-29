import { Dot, ExternalLink, Github } from "lucide-react";
import Card from "../components-base/card";
import Text from "../components-base/text";
import type { ProjectModel } from "../models/projectModel";
import Tecnology from "./tecnology";

interface CardProps extends ProjectModel {}

export default function CardProject({
	title,
	summary,
	features,
	technologies,
	projectLink,
	gitHubLink,
}: CardProps) {
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
				<div className="flex justify-center items-center">
					<Text
						variant="tomorrow-xl"
						className="text-blue-700 dark:text-blue-400"
					>
						{title}
					</Text>
				</div>

				<div className="flex justify-start items-center w-full">
					<Text variant="tomorrow-sm-extralight">{summary}</Text>
				</div>

				<div
					className="
               flex flex-col
               justify-center items-start
               gap-y-1"
				>
					<Text variant="tomorrow-sm">Features:</Text>
					{features.map((feat) => (
						<Text variant="tomorrow-sm-extralight" key={feat}>
							<div className="flex flex-row"><Dot/> {feat}</div>
						</Text>
					))}
				</div>
			</div>

			<div className="flex flex-col gap-y-2">
				<div className="flex flex-wrap justify-start gap-2">
					{technologies.map((tec) => (
						<Tecnology name={tec} key={tec} />
					))}
				</div>

				<div className="flex justify-center items-center w-full gap-x-2">
					<div
						className="
                  bg-gray-light dark:bg-gray-dark p-1
                  rounded-md"
					>
						<a
							href={gitHubLink}
							target="_blank"
							rel="noopener noreferrer"
							className="flex justify-center items-center gap-x-2"
						>
							<Text variant="tomorrow-sm-extralight">GitHub</Text>
							<Github className="w-5 h-5 text-gray-700 dark:text-gray-light" />
						</a>
					</div>

					{projectLink && (
						<div
							className="
                     bg-gray-light dark:bg-gray-dark p-1
                     rounded-md"
						>
							<a
								href={projectLink}
								target="_blank"
								rel="noopener noreferrer"
								className="flex justify-center items-center gap-x-2"
							>
								<Text variant="tomorrow-sm-extralight">Demonstração</Text>
								<ExternalLink className="w-5 h-5 text-gray-700 dark:text-gray-light" />
							</a>
						</div>
					)}
				</div>
			</div>
		</Card>
	);
}
