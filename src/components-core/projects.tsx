import Text from "../components-base/text";
import ButtonAdvance from "./button-advance";
import CardProject from "./card-project";

export default function About() {
	const projectExample = {
		title: "Bazar Carioca",
		summary:
			"Um site para comerciantes pequenos e consumidores se encontrarem.",
		features: [
			"Segurança por Token JWT",
			"Tempo de resposta < 80ms",
			"Single-page-application (SPA)",
			"Visual fluido",
			"Display mobile e desktop",
		],
		technologies: [
			"React",
			"Tailwind CSS",
			".NET",
			"ASP.NET",
			"EntityFramework",
			"MySQL",
			"AWS (EC2, RDS, S3)",
			"GitHub Actions (CI/CD)",
		],
		projectLink: "https://bazar-carioca.vercel.app",
		gitHubLink: "https://github.com",
	};

	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <ids estáticos>
		<div
			id="projetos"
			className="
			custom-section
         gap-y-10"
		>
			<div>
				<Text
					variant="tomorrow-4xl"
					className="font-medium text-green-dark dark:text-green-light"
				>
					Projetos em destaque
				</Text>
			</div>

			<div
				className="
				grid 
				grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
				gap-8"
			>
				<CardProject
					title={projectExample.title}
					summary={projectExample.summary}
					features={projectExample.features}
					technologies={projectExample.technologies}
					gitHubLink={projectExample.gitHubLink}
				/>

				<CardProject
					title={projectExample.title}
					summary={projectExample.summary}
					features={projectExample.features}
					technologies={projectExample.technologies}
					projectLink={projectExample.projectLink}
					gitHubLink={projectExample.gitHubLink}
				/>

				<CardProject
					title={projectExample.title}
					summary={projectExample.summary}
					features={projectExample.features}
					technologies={projectExample.technologies}
					gitHubLink={projectExample.gitHubLink}
				/>
			</div>

			<ButtonAdvance href="#contato" />
		</div>
	);
}
