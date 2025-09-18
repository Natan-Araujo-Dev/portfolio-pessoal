/** biome-ignore-all lint/correctness/useUniqueElementIds: <ids estáticos> */
export default function Content() {
	return (
		<div
			className="
         flex flex-col
         justify-center items-center
         w-full h-full
         z-50
			m-20
			gap-y-20
			text-white"
		>
			<div
				id="inicio"
				className="
				custom-section"
			>
				Início
			</div>

			<div
				id="sobre"
				className="
				custom-section"
			>
				Sobre
			</div>

			<div
				id="habilidades"
				className="
				custom-section"
			>
				Habilidades
			</div>

			<div
				id="projetos"
				className="
				custom-section"
			>
				Projetos
			</div>
		</div>
	);
}
