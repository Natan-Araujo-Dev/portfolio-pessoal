import Card from "../components-base/card";
import Text from "../components-base/text";
import ButtonAdvance from "../components-core/button-advance";

export default function About() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <ids estáticos>
		<div
			id="sobre"
			className="
			custom-section
         gap-y-10"
		>
			<div>
				<Text variant="tomorrow-section">Sobre mim</Text>
			</div>

			<Card
				className="
				flex
				justify-center items-center
				mx-10
				lg:w-180
				p-10"
			>
				<Text
					variant="cascadia-prose"
					className="text-gray-dark dark:text-white"
				>
					Sou um{" "}
					<Text className="text-green-dark dark:text-green-light">
						Desenvolvedor FullStack
					</Text>
					, especializado em{" "}
					<Text className="text-green-dark dark:text-green-light">.NET</Text> e{" "}
					<Text className="text-green-dark dark:text-green-light">React</Text>.
					<br />
					<br />
					Atuo no frontend, backend, banco de dados, infraestrutura, engenharia
					de prompt e testes. Desenvolvo aplicações com foco em desempenho,
					escalabilidade e facilidade de manutenção, utilizando arquiteturas
					modulares e boas práticas de engenharia de software.
					<br />
					<br />
					Tenho experiência na criação e manutenção de plataformas de mensageria
					(SMS, e-mail e mensagens de voz), landing pages, APIs REST e automação
					de processos. Também trabalho com melhorias de UI, UX e acessibilidade
					para pessoas com deficiência (PCD).
					<br />
					<br />
					Uso principalmente Codex como assistente de IA e estruturo
					documentação contextual para reduzir retrabalho, acelerar
					implementações e diminuir custos operacionais. Equilibro legibilidade,
					modularização e agilidade na entrega.
					<br />
					<br />
					Moro no Rio de Janeiro - RJ, com disponibilidade para trabalho
					presencial, remoto ou híbrido.
				</Text>
			</Card>

			<ButtonAdvance href="#experiencia-profissional" />
		</div>
	);
}
