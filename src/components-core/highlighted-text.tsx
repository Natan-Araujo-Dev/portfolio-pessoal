import useLanguage, { translate, type Language } from "../hooks/useLanguage";

const keywords = {
	"text-[#126653] dark:text-[#4EC9B0]": [
		"React",
		"Next.js",
		"Axios",
		"Tailwind CSS",
		"Vite",
		"Class-Variance-Authority",
		"TypeScript",
		"JavaScript",
		"HTML5",
		"CSS3",
		"C#",
		".NET",
		"ASP.NET Core",
		"ASP.NET",
		"Entity Framework",
		"EntityFramework",
		"Dapper",
		"AutoMapper",
		"Node.js",
		"Codex",
		"ChatGPT",
		"RabbitMQ",
		"Git",
		"GitHub",
		"DBeaver",
		"Postman",
		"Insomnia",
		"Figma",
		"LucidChart",
		"FFmpeg",
		"VLibras",
		"SmartSIG",
		"SmartCidadão",
		"SendWork",
		"Desenvolvedor de Software Fullstack",
	],
	"text-[#245b91] dark:text-[#569CD6]": [
		"frontend",
		"backend",
		"fullstack",
		"mensageria",
		"geoprocessamento",
		"gestão municipal",
		"plataforma interna de tarefas",
		"SMS",
		"RCS",
		"APIs REST",
		"RESTful API",
		"REST",
		"API pública",
		"API",
		"APIs",
		"webhooks",
		"endpoints",
	],
	"text-[#276478] dark:text-[#9CDCFE]": [
		"banco de dados",
		"PostgreSQL",
		"MariaDB",
		"SQL Server",
		"MySQL",
		"infraestrutura",
		"Vercel",
		"AWS EC2",
		"AWS RDS",
		"AWS S3",
		"AWS VPC",
		"AWS",
		"Docker Compose",
		"Docker",
		"GitHub Actions",
		"CI/CD",
		"deploys",
		"deploy",
		"Linux",
		"servidores",
		"servidor",
		"documentação",
		"documentação contextual",
		"mapas",
	],
	"text-[#80448a] dark:text-[#D8A0DF]": [
		"prompts",
		"engenharia de prompt",
		"automação",
		"automações",
		"IA",
		"integração contínua",
		"autenticação",
		"autorização",
		"Bearer Token",
		"chatbots",
		"simulação de fluxos",
		"Scrum",
		"Kanban",
		"Engenharia de Software",
		"Programação de Jogos Digitais",
	],
	"text-[#486637] dark:text-[#B8D7A3]": [
		"Clean Architecture",
		"Domain Driven Design",
		"DDD",
		"SOLID",
		"Arquitetura modular",
		"testes de regressão",
		"testes",
		"estabilidade",
		"Resolução de problemas",
		"Comunicação",
		"Autodidata",
		"Proatividade",
		"Trabalho em equipe",
		"Aprendizado contínuo",
		"Flexibilidade",
		"Raciocínio lógico",
		"Pensamento crítico",
	],
	"text-[#78601f] dark:text-[#DCDCAA]": [
		"desempenho",
		"responsividade",
		"manutenção",
		"evolução",
		"monitoramento",
		"diagnóstico",
		"controle de prazos",
		"auditoria",
		"persistência",
	],
	"text-[#925033] dark:text-[#D69D85]": [
		"UI",
		"UX",
		"CAD",
		"DWG",
		"PDF",
		"MP3",
		"WhatsApp",
		"e-mail",
		"Inglês",
		"Espanhol",
		"Português",
		"UNINTER",
		"FAETEC",
		"Rocketseat",
		"Udemy",
	],
	"text-[#306b35] dark:text-[#57A64A]": [
		"acessibilidade",
		"teclado",
		"contraste",
		"descrição de imagens",
		"PCD",
	],
	"text-[#52692c] dark:text-[#B5CEA8]": ["C1", "A1", "C2", "avançado", "básico", "fluente", "acelerar entregas", "reduzir retrabalho"],
};

const cache = new Map<Language, { colors: Map<string, string>; matcher: RegExp }>();
function getHighlights(language: Language) {
	const cached = cache.get(language);
	if (cached) return cached;
	const colors = new Map(Object.entries(keywords).flatMap(([color, words]) =>
		words.flatMap(word => [word, translate(word, {}, language)].map(value => [value.toLowerCase(), color] as const)),
	));
	const pattern = [...colors.keys()].sort((a, b) => b.length - a.length)
		.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
	const result = { colors, matcher: new RegExp(`(?<![\\p{L}\\p{N}_])(${pattern}|\\d+(?:[.,]\\d+)?)(?![\\p{L}\\p{N}_])`, "giu") };
	cache.set(language, result);
	return result;
}

export default function HighlightedText({ children }: { children: string }) {
	const { language, t } = useLanguage();
	const { colors, matcher } = getHighlights(language);
	return t(children).split(matcher).map((part, index) => {
		const color =
			colors.get(part.toLowerCase()) ??
			(/^\d/.test(part) ? "text-[#52692c] dark:text-[#B5CEA8]" : undefined);
		return color ? (
			<span key={`${index}-${part}`} className={color}>
				{part}
			</span>
		) : (
			part
		);
	});
}
