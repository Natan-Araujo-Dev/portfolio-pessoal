/** biome-ignore-all lint/correctness/useUniqueElementIds: <ids estáticos> */
export default function Footer() {
	return (
		<footer
			id="contato"
			className="
         flex flex-col
			z-60
         justify-center items-center
         w-full
			p-8
			gap-5
         text-gray-400
         bg-gray-950"
		>
			<div className="flex flex-col justify-center items-center">
				<div>Natan do Nascimento de Araujo</div>
				<div>Desenvolvedor Fullstack | React | ASP.NET</div>
			</div>

			<div className="flex flex-col justify-center items-center">
				(icones das redes sociais)
			</div>
 
			<div className="flex flex-col justify-center items-center text-center">
				© 2025 Natan do Nascimento de Araujo. Todos os direitos reservados.
				<br />
				Desenvolvido com ❤️ usando React, Tailwind CSS e Vite.
			</div>
		</footer>
	);
}
