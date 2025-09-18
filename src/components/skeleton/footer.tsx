/** biome-ignore-all lint/correctness/useUniqueElementIds: <ids estáticos> */

import { FileText, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
	return (
		<footer
			id="contato"
			className="
         flex flex-col
			z-60
         justify-center items-center
         w-full
         bg-[#3e7be3] dark:bg-[#16181a]"
		>
			<div
				className="
				flex flex-col
				gap-5
				m-6"
			>
				<div
					className="
					flex flex-col
					justify-center items-center"
				>
					<div className="text-xl text-green-400">
						Natan do Nascimento de Araujo
					</div>
					<div
						className="
         			text-white dark:text-gray-400"
					>
						Desenvolvedor Fullstack | React | ASP.NET
					</div>
				</div>

				<div
					className="
					flex flex-col
					justify-center items-center
					gap-y-2 
        			text-gray-300"
				>
					Meus contatos:
					<div
						className="
						flex flex-row
						justify-center items-center
						gap-6"
					>
						<a
							href="https://linkedin.com/in/natan-araujo-dev"
							target="_blank"
							rel="noopener noreferrer"
							className="flex flex-row gap-x-2 hover:text-green-600 expand-lg"
						>
							Linkedin <Linkedin className="w-6 h-6 text-blue-600" />
						</a>

						<a
							href="https://github.com/natan-araujo-dev"
							target="_blank"
							rel="noopener noreferrer"
							className="flex flex-row gap-x-2 hover:text-green-600 expand-lg"
						>
							Github <Github className="w-6 h-6 text-gray-700" />
						</a>

						<a
							href="https://mail.google.com/mail/?view=cm&fs=1&to=natan.araujo.dev@gmail.com"
							className="flex flex-row gap-x-2 hover:text-green-600 expand-lg"
						>
							Email
							<Mail className="w-6 h-6 hover:text-green-600 text-yellow-600" />
						</a>

						<a
							href="https://drive.google.com/file/d/14wbYIJbS-nE3TwMYItU8X1eUGoBqLxgL/view?usp=drive_link"
							target="_blank"
							rel="noopener noreferrer"
							className="flex flex-row gap-x-2 hover:text-green-600 expand-lg"
						>
							Currículo <FileText className="w-6 h-6 text-white" />
						</a>
					</div>
				</div>
			</div>

			<div
				className="
				flex flex-col
				justify-center items-center
				text-center
				text-white dark:text-gray-400
				w-full
				py-3
				bg-[#374cba] dark:bg-[#0e1012]"
			>
				© 2025 Natan do Nascimento de Araujo. Todos os direitos reservados.
				<br />
				Desenvolvido com ❤️ usando React, Tailwind CSS e Vite.
			</div>
		</footer>
	);
}
//#374cba
