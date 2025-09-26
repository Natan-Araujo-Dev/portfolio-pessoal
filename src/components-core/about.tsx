import Card from "../components-base/card";
import Text from "../components-base/text";
import ButtonAdvance from "./button-advance";

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
				<Text
					variant="tomorrow-4xl"
					className="font-medium text-green-dark dark:text-green-light"
				>
					Sobre mim
				</Text>
			</div>

			<Card
				className="
				flex
				justify-center items-center
				w-180 h-100
				p-10"
			>
				<Text className="text-gray-dark dark:text-white">
					Sou um{" "}
					<Text className="text-green-dark dark:text-green-light">
						Desenvolvedor FullStack
					</Text>
					.
					<br />
					<br />
					Comecei minha jornada como{" "}
					<Text className="text-green-dark dark:text-green-light">
						Desenvolvedor de Software
					</Text>{" "}
					em 2021, com criando jogos digitais na Unity.
					<br />
					<br />
					Nesses últimos 4 anos, desenvolvi jogos, aplicativos, programas de
					consoles.
					<br />
					<br />
					Em setembro de 2024, me especializei no{" "}
					<Text className="text-green-dark dark:text-green-light">
						Desenvolvimento Web
					</Text>{" "}
					através de cursos e estudo por conta própria sobre{" "}
					<Text className="text-green-dark dark:text-green-light">React</Text> e{" "}
					<Text className="text-green-dark dark:text-green-light">ASP.NET</Text>
					.
					<br />
					<br />
					Desde então, venho desenvolvendo{" "}
					<Text className="text-green-dark dark:text-green-light">APIs</Text> e{" "}
					<Text className="text-green-dark dark:text-green-light">sites</Text>{" "}
					como esse.
				</Text>
			</Card>

			<ButtonAdvance href="#habilidades" />
		</div>
	);
}
