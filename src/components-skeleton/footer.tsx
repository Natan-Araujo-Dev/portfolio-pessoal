/** biome-ignore-all lint/correctness/useUniqueElementIds: <ids estáticos> */

import {
	FileText,
	Github,
	Linkedin,
	Mail,
	MessageCircle,
	Phone,
} from "lucide-react";
import Text from "../components-base/text";

export default function Footer() {
	return (
		<footer
			id="contato"
			className="
         flex flex-col
			z-60
         justify-center items-center
         w-full"
		>
			<div
				className="
				flex flex-col
				h-full w-full
				gap-5
				p-6
         	bg-footer-main-light/80 dark:bg-footer-main-dark/95"
			>
				{/* Informações do desenvolvedor */}
				<div
					className="
					flex flex-col
					justify-center items-center"
				>
					<div className="text-xl text-green-light">
						<Text variant="tomorrow-xl">Natan do Nascimento de Araujo</Text>
					</div>
					<div
						className="
         			text-white dark:text-gray-400"
					>
						<Text variant="tomorrow-md-extralight">
							Desenvolvedor Fullstack | React | ASP.NET
						</Text>
					</div>
				</div>

				<div
					className="
					flex flex-col
					justify-center items-center
					gap-y-2 
        			text-white dark:text-gray-200"
				>
					<Text variant="tomorrow-md-extralight">Meus contatos:</Text>
					<div
						className="
						flex flex-row
						justify-center items-center
						gap-6"
					>
						{/* LinkedIn */}
						<a
							href="https://linkedin.com/in/natan-araujo-dev"
							target="_blank"
							rel="noopener noreferrer"
							className="flex flex-row justify-center items-center gap-x-2 hover:text-green-light expand-lg"
						>
							<Text variant="tomorrow-sm-extralight">LinkedIn</Text>{" "}
							<Linkedin className="w-6 h-6 text-blue-600" />
						</a>

						{/* GitHub */}
						<a
							href="https://github.com/natan-araujo-dev"
							target="_blank"
							rel="noopener noreferrer"
							className="flex flex-row justify-center items-center gap-x-2 hover:text-green-light expand-lg"
						>
							<Text variant="tomorrow-sm-extralight">GitHub</Text>{" "}
							<Github className="w-6 h-6 text-gray-700" />
						</a>

						{/* Email */}
						<a
							href="https://mail.google.com/mail/?view=cm&fs=1&to=natan.araujo.dev@gmail.com"
							target="_blank"
							rel="noopener noreferrer"
							className="flex flex-row justify-center items-center gap-x-2 hover:text-green-light expand-lg"
						>
							<Text variant="tomorrow-sm-extralight">Email</Text>
							<Mail className="w-6 h-6 text-yellow-600" />
						</a>

						{/* Currículo */}
						<a
							href="https://drive.google.com/file/d/1Yjk_E6_Aghy2IOqPNiJ47qalMpqtkJwy/view?usp=sharing"
							target="_blank"
							rel="noopener noreferrer"
							className="flex flex-row justify-center items-center gap-x-2 hover:text-green-light expand-lg"
						>
							<Text variant="tomorrow-sm-extralight">Curriculo</Text>{" "}
							<FileText className="w-6 h-6 text-white" />
						</a>

						{/* Whatsapp */}
						<a
							href={`https://wa.me/+5521976486646?`}
							target="_blank"
							rel="noopener noreferrer"
							className="flex flex-row justify-center items-center gap-x-2 hover:text-green-light expand-lg"
						>
							<Text variant="tomorrow-sm-extralight">WhatsApp</Text>
							<MessageCircle
								size={22}
								aria-hidden="true"
								className="text-green-500"
							/>
						</a>

						{/* Telefone */}
						<div className="flex flex-row justify-center items-center gap-x-2">
							<Text variant="tomorrow-sm-extralight">+55 (21) 97648-6646</Text>
							<Phone size={18} aria-hidden="true" />
						</div>
					</div>
				</div>
			</div>

			{/* Informações finais do site */}
			<div
				className="
				flex flex-col
				justify-center items-center
				text-center
				text-white dark:text-gray-400
				w-full
				py-3
				bg-footer-end-light dark:bg-footer-end-dark"
			>
				<Text variant="tomorrow-xs-extralight">
					© 2025 Natan do Nascimento de Araujo. Todos os direitos reservados.
					<br />
					Desenvolvido com ❤️ usando React, Tailwind CSS e Vite.
				</Text>
			</div>
		</footer>
	);
}
//#374cba
