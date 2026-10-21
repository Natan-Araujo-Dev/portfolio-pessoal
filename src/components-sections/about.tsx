import { MapPin } from "lucide-react";
import ScrollSection from "../components-core/scroll-section";
import Text from "../components-base/text";
import ButtonAdvance from "../components-core/button-advance";
import SpotlightCard from "../components-core/spotlight-card";
import AboutDetails from "../components-core/about-details";

export default function About() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <ids estáticos>
		<ScrollSection id="sobre" className="custom-section about-pattern gap-y-10">
			<Text as="h2" variant="tomorrow-section">Sobre mim</Text>
			<SpotlightCard spotlightColor="#2596be" intensity={0.22} smoothing={0.1}
				className="w-full max-w-5xl p-6 sm:p-8 text-gray-dark dark:text-gray-200">
				<div className="grid gap-8 md:grid-cols-2">
					<div>
						<h3 className="font-tomorrow text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
							Desenvolvedor FullStack.<br />
							<span className="text-green-dark dark:text-green-light">Software com clareza e propósito.</span>
						</h3>
						<Text as="p" variant="cascadia-prose" className="mt-5">
							Especializado em .NET e React, com atuação do frontend à infraestrutura.
						</Text>
						<Text as="p" variant="cascadia-prose" className="mt-4">
							Uso de IA e documentação contextual para acelerar entregas e reduzir retrabalho.
						</Text>
						<AboutDetails>
							<Text
								variant="cascadia-prose"
								className="text-gray-dark dark:text-white"
							>
								Sou um <Text className="text-[#126653] dark:text-[#4EC9B0]">Desenvolvedor FullStack</Text>
								, especializado em <Text className="text-[#126653] dark:text-[#4EC9B0]">.NET</Text> e{" "}
								<Text className="text-[#126653] dark:text-[#4EC9B0]">React</Text>.
								<br />
								<br />
								Atuo no <Text className="text-[#245b91] dark:text-[#569CD6]">frontend</Text>,{" "}
								<Text className="text-[#245b91] dark:text-[#569CD6]">backend</Text>,{" "}
								<Text className="text-[#276478] dark:text-[#9CDCFE]">banco de dados</Text>,{" "}
								<Text className="text-[#276478] dark:text-[#9CDCFE]">infraestrutura</Text>,{" "}
								<Text className="text-[#80448a] dark:text-[#D8A0DF]">engenharia de prompt</Text> e{" "}
								<Text className="text-[#486637] dark:text-[#B8D7A3]">testes</Text>. Desenvolvo aplicações
								com foco em <Text className="text-[#78601f] dark:text-[#DCDCAA]">desempenho</Text>,{" "}
								<Text className="text-[#78601f] dark:text-[#DCDCAA]">escalabilidade</Text> e{" "}
								<Text className="text-[#78601f] dark:text-[#DCDCAA]">facilidade de manutenção</Text>,
								utilizando{" "}
								<Text className="text-[#486637] dark:text-[#B8D7A3]">arquiteturas modulares</Text> e{" "}
								<Text className="text-[#486637] dark:text-[#B8D7A3]">
									boas práticas de engenharia de software
								</Text>
								.
								<br />
								<br />
								Tenho experiência na criação e manutenção de{" "}
								<Text className="text-[#245b91] dark:text-[#569CD6]">plataformas de mensageria</Text>{" "}
								(SMS, e-mail e mensagens de voz),{" "}
								<Text className="text-[#925033] dark:text-[#D69D85]">landing pages</Text>,{" "}
								<Text className="text-[#126653] dark:text-[#4EC9B0]">APIs REST</Text> e{" "}
								<Text className="text-[#80448a] dark:text-[#D8A0DF]">automação de processos</Text>. Também
								trabalho com melhorias de <Text className="text-[#925033] dark:text-[#D69D85]">UI</Text>,{" "}
								<Text className="text-[#925033] dark:text-[#D69D85]">UX</Text> e{" "}
								<Text className="text-[#306b35] dark:text-[#57A64A]">
									acessibilidade para pessoas com deficiência (PCD)
								</Text>
								.
								<br />
								<br />
								Uso principalmente <Text className="text-[#126653] dark:text-[#4EC9B0]">Codex</Text> como{" "}
								<Text className="text-[#80448a] dark:text-[#D8A0DF]">assistente de IA</Text> e estruturo{" "}
								<Text className="text-[#276478] dark:text-[#9CDCFE]">documentação contextual</Text> para{" "}
								<Text className="text-[#52692c] dark:text-[#B5CEA8]">reduzir retrabalho</Text>,{" "}
								<Text className="text-[#52692c] dark:text-[#B5CEA8]">acelerar implementações</Text> e{" "}
								<Text className="text-[#52692c] dark:text-[#B5CEA8]">diminuir custos operacionais</Text>.
								Equilibro <Text className="text-[#78601f] dark:text-[#DCDCAA]">legibilidade</Text>,{" "}
								<Text className="text-[#486637] dark:text-[#B8D7A3]">modularização</Text> e{" "}
								<Text className="text-[#78601f] dark:text-[#DCDCAA]">agilidade na entrega</Text>.
								<br />
								<br />
								Moro no <Text className="text-[#925033] dark:text-[#D69D85]">Rio de Janeiro - RJ</Text>,
								com disponibilidade para trabalho{" "}
								<Text className="text-[#276478] dark:text-[#9CDCFE]">presencial, remoto ou híbrido</Text>.
							</Text>
						</AboutDetails>
					</div>
					<dl className="space-y-6 border-t border-slate-500/20 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
						<div>
							<dt className="font-tomorrow text-sm font-medium tracking-wider text-[#245b91] dark:text-[#76b6ec]">O QUE DESENVOLVO</dt>
							<dd className="prose-text mt-2 text-base leading-relaxed">Sites, aplicações, APIs REST e automações.</dd>
						</div>
						<div>
							<dt className="font-tomorrow text-sm font-medium tracking-wider text-[#245b91] dark:text-[#76b6ec]">ONDE TENHO EXPERIÊNCIA</dt>
							<dd className="prose-text mt-2 text-base leading-relaxed">Mensageria, manutenção e evolução de sistemas.</dd>
						</div>
						<div>
							<dt className="font-tomorrow text-sm font-medium tracking-wider text-[#245b91] dark:text-[#76b6ec]">MEU FOCO</dt>
							<dd className="prose-text mt-2 text-base leading-relaxed">Desempenho, acessibilidade e facilidade de manutenção.</dd>
						</div>
					</dl>
				</div>
				<p className="mt-6 flex items-start gap-2 border-t border-slate-500/20 pt-5 font-tomorrow text-sm">
					<MapPin size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
					Rio de Janeiro - RJ, Brasil · Presencial, híbrido ou remoto
				</p>
			</SpotlightCard>
			<ButtonAdvance href="#experiencia-profissional" />
		</ScrollSection>
	);
}
