import type { ProjectModel } from "../models/projectModel";

export const projectsList: ProjectModel[] = [
	// Contribuições profissionais na Reeve
	{
		title: "SmartSIG",
		summary:
			"Manutenção e evolução do sistema de gestão municipal e geoprocessamento da Reeve.",
		features: [
			"Corrigi cadastros e aprimorei pesquisas, seleção e edição nos mapas.",
			"Ajustei importação e exportação CAD e impressão de mapas em PDF.",
			"Melhorei responsividade, desempenho das camadas e testes de regressão.",
			"Ajustei deploys com Docker e conversão DWG no Linux.",
		],
		technologies: [
			"React",
			"TypeScript",
			"Vite",
			"Node.js",
			"PostgreSQL",
			"Docker",
		],
	},

	{
		title: "SmartCidadão",
		summary:
			"Evolução do portal de serviços ao cidadão da Reeve, com foco em acessibilidade e atendimento.",
		features: [
			"Ampliei acessibilidade: teclado, contraste, VLibras e descrição de imagens.",
			"Aprimorei gráficos, filtros e controle de prazos do atendimento.",
			"Adicionei avisos de comunicados e auditoria de exclusão de contas.",
			"Corrigi compatibilidade com bancos legados e configurei deploys por prefeitura.",
		],
		technologies: [
			"Next.js",
			"React",
			"TypeScript",
			"Node.js",
			"PostgreSQL",
			"Docker",
		],
	},

	{
		title: "SendWork",
		summary:
			"Manutenção e evolução da plataforma de mensageria da Reeve: campanhas, chatbots e APIs.",
		features: [
			"Evoluí o editor de chatbots com simulação de fluxos e integração às campanhas.",
			"Implementei reuso de contatos e conversão de áudio para MP3.",
			"Corrigi envios, indicadores, webhooks e responsividade de SMS/RCS.",
			"Aprimorei a documentação da API com requisições editáveis e exportação para Postman/Insomnia.",
		],
		technologies: ["React", "TypeScript", "C#", ".NET", "APIs REST", "FFmpeg"],
	},

	// Bazar Carioca
	{
		title: "Bazar Carioca",
		summary:
			"Projeto pessoal fullstack para conectar pequenos comerciantes e consumidores, reunindo uma aplicação web e sua API.",
		features: [
			"Frontend em React e TypeScript, com layout para desktop e celular.",
			"API em ASP.NET com autenticação e autorização por Bearer Token.",
			"Persistência em MySQL com Entity Framework e infraestrutura na AWS.",
			"Arquitetura modular e integração contínua com GitHub Actions.",
		],
		technologies: [
			"React",
			"TypeScript",
			"Tailwind CSS",
			"Vite",
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
		gitHubLinks: [
			{
				label: "Backend",
				url: "https://github.com/Natan-Araujo-Dev/Bazar-Carioca-Backend",
			},
			{
				label: "Frontend",
				url: "https://github.com/Natan-Araujo-Dev/Bazar-Carioca-Frontend",
			},
		],
	},
];
