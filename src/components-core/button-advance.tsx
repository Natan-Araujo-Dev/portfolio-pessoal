import { ArrowDown } from "lucide-react";
import useLanguage from "../hooks/useLanguage";

interface ButtonAdvanceProps {
	href: string;
}

export default function ButtonAdvance({ href }: ButtonAdvanceProps) {
	const { t } = useLanguage();
	return (
		<div className="inline-flex animate-bounce [animation-duration:1.8s]">
			<div
				className="
				hidden lg:flex"
			>
				<a href={href} aria-label={t("Ir para a próxima seção")} className="expand-lg fill-color">
					<ArrowDown size="40px" />
				</a>
			</div>

			<div
				className="
				lg:hidden"
			>
				<a href={href} aria-label={t("Ir para a próxima seção")} className="expand-lg fill-color">
					<ArrowDown size="30px" />
				</a>
			</div>
		</div>
	);
}
