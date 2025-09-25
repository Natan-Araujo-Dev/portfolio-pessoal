import Text from "../components-base/text";
import ButtonAdvance from "./button-advance";

export default function Start() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <ids estáticos>
		<div
			id="inicio"
			className="
			custom-section
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
