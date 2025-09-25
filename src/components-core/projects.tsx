// import Card from "../components-base/card";
// import Text from "../components-base/text";
import ButtonAdvance from "./button-advance";

export default function About() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <ids estáticos>
		<div
			id="projetos"
			className="
			custom-section
         gap-y-10"
		>
			Meus projetos
			<ButtonAdvance href="#contato" />
		</div>
	);
}
