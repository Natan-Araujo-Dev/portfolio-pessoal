/** biome-ignore-all lint/correctness/useUniqueElementIds: <ids estáticos> */
import Text from "../components-base/text";
import ButtonAdvance from "../components-core/button-advance";

export default function Start() {
	return (
		<div
			id="inicio"
			className="
			custom-section"
		>
			<StartDesktop />
			<StartMobile />
		</div>
	);
}

function StartDesktop() {
	return (
		<div
			className="
			
			flex-col
			justify-center items-center
			hidden lg:flex
			gap-y-5"
		>
			<div>
				<Text variant="tomorrow-impact">
					Bem vindo(a) ao meu site. <br />
					Meu nome é{" "}
					<Text variant="tomorrow-impact" className="text-green-dark">
						Natan Araujo
					</Text>
					.
				</Text>
			</div>

			<div className="flex justify-center">
				<Text variant="tomorrow-impact-sm">
					Desenvolvedor FullStack | Engenheiro de Software
				</Text>
			</div>

			<ButtonAdvance href="#sobre" />
		</div>
	);
}

function StartMobile() {
	return (
		<div
			className="
			flex flex-col
			justify-center items-center
			lg:hidden
			gap-y-5"
		>
			<div>
				<Text variant="tomorrow-impact">
					Bem vindo(a)
					<br /> ao meu site.
					<br /> Meu nome é <br />
					<Text variant="tomorrow-impact" className="text-green-dark">
						Natan Araujo
					</Text>
					.
				</Text>
			</div>

			<div className="flex justify-center">
				<Text variant="tomorrow-impact-sm">
					Desenvolvedor FullStack | Engenheiro de Software
				</Text>
			</div>

			<ButtonAdvance href="#sobre" />
		</div>
	);
}
