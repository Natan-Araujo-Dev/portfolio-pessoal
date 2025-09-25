import ButtonAdvance from "./button-advance";

export default function Skills() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <ids estáticos>
		<div
			id="habilidades"
			className="
			custom-section
         gap-y-10"
		>
			Minhas habilidades
			<ButtonAdvance href="#projetos" />
		</div>
	);
}
