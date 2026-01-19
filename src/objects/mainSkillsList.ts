import type { SkillModel } from "../models/skillModel";

export const mainSkillsList: SkillModel[] = [
	{
		title: "Frontend",
		skills: [
			"React",
			"Tailwind CSS",
			"Vite",
			"Class-Variance-Authority",
			"Typescript",
			"Javascript",
			"HTML5",
			"CSS3",
		],
	},

	{
		title: "Backend",
		skills: ["C#", ".NET", "ASP.NET", "EntityFramework", "AutoMapper", "MySQL"],
	},

	{
		title: "Boas práticas",
		skills: ["Clean Architecture", "Domain Driven Design", "SOLID", "REST"],
	},

	{
		title: "Cloud",
		skills: ["Vercel", "AWS EC2", "AWS RDS", "AWS S3", "AWS VPS"],
	},

	{
		title: "DevOps",
		skills: ["GitHub Actions (CI/CD)"],
	},

	{
		title: "Metodologias ágeis",
		skills: ["Scrum", "Kanbam"],
	},
];
