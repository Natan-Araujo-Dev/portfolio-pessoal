import type { ProjectModel } from "../models/projectModel";
import bazarDesktopHome from "../assets/project-previews/bazar-video-home-desktop.webp";
import bazarDesktopStore from "../assets/project-previews/bazar-video-store-desktop.webp";
import bazarDesktopProduct from "../assets/project-previews/bazar-video-product-desktop.webp";
import bazarMobileHome from "../assets/project-previews/bazar-video-home-mobile.webp";
import bazarMobileStore from "../assets/project-previews/bazar-video-store-mobile.webp";
import smartCidadaoDashboard from "../assets/project-previews/smartcidadao-painel.webp";
import smartCidadaoStats from "../assets/project-previews/smartcidadao-estatisticas.webp";
import smartSigMap from "../assets/project-previews/smartsig-mapa.webp";
import smartSigLayers from "../assets/project-previews/smartsig-camadas.webp";
import sendWorkCampaigns from "../assets/experience-wall/mobile/sendwork-1.webp";
import sendWorkShortLinks from "../assets/experience-wall/mobile/sendwork-2.webp";

export const projectsList: ProjectModel[] = [
	// Contribuições profissionais na Reeve
	{
		title: "SmartSIG",
		projectLink: "https://guapimirim.smartsig.com.br",
		images: [
			{ image: smartSigMap, label: "Mapa geral" },
			{ image: smartSigLayers, label: "Camadas do mapa" },
		],
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
		projectLink: "https://guapimirim.smartcidadao.com.br",
		images: [
			{ image: smartCidadaoDashboard, label: "Painel de Gestão Municipal" },
			{ image: smartCidadaoStats, label: "Estatísticas da ouvidoria" },
		],
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
		projectLink: "https://app.sendwork.com.br",
		images: [
			{ image: sendWorkCampaigns, label: "Painel de campanhas" },
			{ image: sendWorkShortLinks, label: "Encurtador de links" },
		],
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
		images: [
			{ image: bazarDesktopHome, label: "Página inicial no desktop" },
			{ image: bazarDesktopStore, label: "Página da loja no desktop" },
			{ image: bazarDesktopProduct, label: "Página do produto no desktop" },
			{ image: bazarMobileHome, label: "Página inicial no celular" },
			{ image: bazarMobileStore, label: "Página da loja no celular" },
		],
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
