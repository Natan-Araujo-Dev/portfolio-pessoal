import type { Project } from "../models/project";

export const projectList: Project[] = [
	// Bazar carioca Backend
	{
		title: "Bazar Carioca Backend",
		summary: "Web API do Bazar Carioca",
		features: [
			"Autênticação e autorização por Bearer Token",
			"Modulável e escalonável",
		],
		technologies: [
			"C#",
			".NET",
			"ASP.NET",
			"MySQL",
			"EntityFramework",
			"AWS EC2",
			"AWS RDS",
			"AWS S3",
			"REST",
			"SOLID",
			"GitHub Actions(CI/CD)",
		],
		gitHubLink: "https://github.com/Natan-Araujo-Dev/Bazar-Carioca-Backend",
	},

	// Bazar Carioca Frontend
	{
		title: "Bazar Carioca Frontend",
		summary:
			"Um site para comerciantes pequenos e consumidores se encontrarem.",
		features: [
			"Tempo de resposta < 30ms",
			"Single-page-application (SPA)",
			"Visual fluido",
			"Display mobile e desktop",
		],
		technologies: [
			"React",
			"Tailwind CSS",
			"Vite",
			"TypeScript",
			"JavaScript",
			"HTML",
		],
		projectLink: "https://bazar-carioca.vercel.app",
		gitHubLink: "https://github.com/Natan-Araujo-Dev/Bazar-Carioca-Frontend",
	},

	// Portfólio Pessoal
	{
		title: "Portfólio pessoal (este site)",
		summary: "Meu site de portfólio pessoal.",
		features: [
			"Modo claro/escuro",
			"Visual fluido",
			"Modo claro/escuro",
			"Design interativo",
		],
		technologies: [
			"React",
			"Tailwind CSS",
			"Vite",
			"TypeScript",
			"JavaScript",
			"HTML",
		],
		projectLink: "https://natan-araujo-dev-portfolio.vercel.app/",
		gitHubLink: "https://github.com/Natan-Araujo-Dev/portfolio-pessoal",
	},
];
