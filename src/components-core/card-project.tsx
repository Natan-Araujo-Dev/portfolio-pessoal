import Card from "../components-base/card";
import Text from "../components-base/text";

interface CardProps {
	title: string;
	summary: string;
	features: string[];
	technologies: string[];
	projectLink?: string | null;
	gitHubLink: string;
}

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
					<Text variant="tomorrow-xl">{title}</Text>
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
							- {feat}
							<br />
						</Text>
					))}
				</div>
			</div>

			<div>
				<div className="">
					{technologies.map((tec) => (
						<Text variant="tomorrow-sm-extralight" key={tec}>
							{tec}
							{" | "}
						</Text>
					))}
				</div>

				<div className="flex justify-center items-center w-full gap-x-2">
					<a href={gitHubLink} target="_blank" rel="noopener noreferrer">
						<Text variant="tomorrow-sm-extralight">GitHub</Text>
					</a>

					{projectLink && (
						<a href={projectLink} target="_blank" rel="noopener noreferrer">
							<Text variant="tomorrow-sm-extralight">Demonstração</Text>
						</a>
					)}
				</div>
			</div>
		</Card>
	);
}
