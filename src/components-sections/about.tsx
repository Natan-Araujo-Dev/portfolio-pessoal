import ScrollSection from "../components-core/scroll-section";
import Text from "../components-base/text";
import ButtonAdvance from "../components-core/button-advance";
import SpotlightCard from "../components-core/spotlight-card";

export default function About() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <ids estáticos>
		<ScrollSection
			id="sobre"
			className="
			custom-section about-pattern
         gap-y-10"
		>
			<div>
				<Text as="h2" variant="tomorrow-section">Sobre mim</Text>
			</div>

			<SpotlightCard
				spotlightColor="#2596be"
				intensity={0.22}
				smoothing={0.1}
				className="
				flex
				justify-center items-center
				w-full max-w-3xl
				p-6 sm:p-10"
			>
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
			</SpotlightCard>

			<ButtonAdvance href="#experiencia-profissional" />
		</ScrollSection>
	);
}
