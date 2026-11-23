/** biome-ignore-all lint/correctness/useUniqueElementIds: <ids estáticos> */

import { ArrowUpRight, FileText, Github, Linkedin, Mail, Phone } from "lucide-react";
import Text from "../components-base/text";
import ContactLink from "../components-core/contact-link";
import ShinyText, { SHINY_TEXT_COLOR } from "../components-core/shiny-text";
import csharpLogo from "../assets/csharp-logo.svg";
import dockerLogo from "../assets/docker-logo.svg";
import dotnetLogo from "../assets/dotnet-logo.svg";
import gitLogo from "../assets/git-logo.svg";
import postgresLogo from "../assets/postgresql-logo.svg";
import rabbitmqLogo from "../assets/rabbitmq-logo.svg";
import reactLogo from "../assets/react-logo.svg";
import tailwindLogo from "../assets/tailwindcss-logo.svg";
import typescriptLogo from "../assets/typescript-logo.svg";
import viteLogo from "../assets/vite-logo.svg";
import "./footer.css";

const profiles = [
	{ label: "LinkedIn", href: "https://linkedin.com/in/natan-araujo-dev", icon: Linkedin },
	{ label: "GitHub", href: "https://github.com/natan-araujo-dev", icon: Github },
	{ label: "Curriculo", href: "https://drive.google.com/file/d/1Yjk_E6_Aghy2IOqPNiJ47qalMpqtkJwy/view?usp=sharing", icon: FileText },
];

export default function Footer() {
	return (
		<footer
			id="contato"
			className="contact-section relative z-60 grid min-h-(--section-viewport-height) w-full grid-rows-[1fr_auto] bg-footer-main-light text-gray-dark dark:bg-footer-main-dark dark:text-gray-200"
		>
			<div className="contact-brand-background pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
				<img src={reactLogo} className="absolute top-1/2 left-0 aspect-square h-[96%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-contain opacity-15 dark:opacity-20" alt="" />
				<img src={typescriptLogo} className="absolute top-[8%] left-[38%] aspect-square w-[clamp(2.75rem,7vw,6.5rem)] opacity-10 dark:opacity-15" alt="" />
				<img src={rabbitmqLogo} className="absolute top-[14%] left-[57%] aspect-square w-[clamp(2.25rem,5vw,5rem)] opacity-10 dark:opacity-15" alt="" />
				<img src={dockerLogo} className="absolute top-[8%] right-[clamp(1.5rem,7vw,7rem)] aspect-square w-[clamp(4rem,12vw,11rem)] opacity-10 dark:opacity-15" alt="" />
				<img src={csharpLogo} className="absolute top-[20%] left-[14%] aspect-square w-[clamp(2.25rem,5.5vw,5rem)] opacity-10 dark:opacity-15" alt="" />
				<img src={tailwindLogo} className="absolute top-[32%] right-[12%] aspect-square w-[clamp(2.75rem,8vw,7.5rem)] opacity-10 dark:opacity-15" alt="" />
				<img src={viteLogo} className="absolute top-[56%] left-[55%] aspect-square w-[clamp(2.5rem,7vw,6.5rem)] opacity-10 dark:opacity-15" alt="" />
				<img src={gitLogo} className="absolute bottom-[clamp(5.5rem,18%,11rem)] left-[16%] aspect-square w-[clamp(2.25rem,6vw,5.5rem)] opacity-10 dark:opacity-15" alt="" />
				<img src={postgresLogo} className="absolute bottom-[clamp(5rem,13%,9rem)] left-[36%] aspect-square w-[clamp(3rem,9vw,8.5rem)] opacity-10 dark:opacity-15" alt="" />
				<img src={dotnetLogo} className="absolute right-[clamp(1.5rem,7vw,7rem)] bottom-[clamp(5.5rem,16%,10rem)] aspect-square w-[clamp(6rem,17vw,15rem)] opacity-10 dark:opacity-15" alt="" />
			</div>
			<div className="contact-main mx-auto grid w-full max-w-6xl content-center items-center gap-[clamp(1.5rem,5svh,3.5rem)] px-5 py-[clamp(1.75rem,6svh,5rem)] sm:px-8 md:grid-cols-[1.2fr_1fr] lg:px-10">
				<div className="min-w-0">
					<Text as="h2" className="contact-heading mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em]">
						Contato
					</Text>
					<Text as="p" className="contact-name mb-4 text-4xl leading-[1.06] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
						Natan do Nascimento de Araujo
					</Text>
					<div className="font-tomorrow text-sm leading-relaxed text-gray-dark sm:text-base dark:text-gray-300">
						<ShinyText
							color="currentColor"
							shineColor={SHINY_TEXT_COLOR}
							speed={3}
							delay={1}
							animateOnMobile
							text="Desenvolvedor Fullstack | React | .NET"
						/>
					</div>
				</div>

				<div className="min-w-0">
					<div className="contact-channels grid gap-2.5">
						<ContactLink label="Telefone" copyValue="+5521976486646" copyLabel="Copiar telefone">
							<Phone size={21} className="contact-icon" aria-hidden="true" />
							<span className="grid min-w-0 flex-1 gap-0.5 text-left">
								<Text className="text-xs font-medium">Telefone</Text>
								<span className="font-tomorrow text-sm font-semibold">+55 (21) 97648-6646</span>
							</span>
						</ContactLink>
						<ContactLink label="Endereço de e-mail" copyValue="natan.araujo.dev@gmail.com" copyLabel="Copiar e-mail">
							<Mail size={21} className="contact-icon" aria-hidden="true" />
							<span className="grid min-w-0 flex-1 gap-0.5 text-left">
								<Text className="text-xs font-medium">Endereço de e-mail</Text>
								<span className="font-tomorrow text-sm font-semibold">natan.araujo.dev@gmail.com</span>
							</span>
						</ContactLink>
					</div>
					<div className="contact-profiles mt-3 grid grid-cols-3 gap-2 sm:gap-2.5">
						{profiles.map(({ label, href, icon: Icon }) => (
							<ContactLink key={label} label={label} href={href}>
								<Icon size={18} className="contact-icon" aria-hidden="true" />
								<Text className="text-xs font-semibold sm:text-sm">{label}</Text>
								<ArrowUpRight size={14} className="ml-auto hidden shrink-0 xl:block" aria-hidden="true" />
							</ContactLink>
						))}
					</div>
				</div>
			</div>

			<div className="contact-credits bg-footer-end-light/55 dark:bg-footer-end-dark/50">
				<div className="mx-auto flex w-full max-w-6xl flex-wrap justify-between gap-x-6 gap-y-1 py-4 pr-22 pl-5 font-tomorrow text-xs leading-relaxed sm:pl-8 lg:pl-10 xl:pr-10">
					<Text>© 2025 Natan do Nascimento de Araujo. Todos os direitos reservados.</Text>
					<Text>Desenvolvido com ❤️ usando React, Tailwind CSS e Vite.</Text>
				</div>
			</div>
		</footer>
	);
}
