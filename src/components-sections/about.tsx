import { MapPin } from "lucide-react";
import ScrollSection from "../components-core/scroll-section";
import Text from "../components-base/text";
import TextPatternBackground from "../components-core/text-pattern-background";
import SpotlightCard from "../components-core/spotlight-card";
import HighlightedText from "../components-core/highlighted-text";
import useLanguage from "../hooks/useLanguage";

export default function About() {
	const { t } = useLanguage();
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <ids estáticos>
		<ScrollSection id="sobre" className="custom-section about-pattern gap-y-10">
			<TextPatternBackground text={t("sobre mim ·")} fontSize={28} gap={12} separatorGap={4} scrollReveal />
			<SpotlightCard spotlightColor="#2596be" intensity={0.22} smoothing={0.1}
				className="w-full max-w-5xl p-6 sm:p-8 text-gray-dark dark:text-gray-200">
				<div className="grid gap-4 md:grid-cols-2 md:gap-8">
					<div className="contents md:block">
						<h3 className="font-tomorrow text-xl font-semibold leading-snug tracking-tight sm:text-2xl max-md:border-b max-md:border-slate-500/20 max-md:pb-4">
							{t("Desenvolvedor FullStack.")}<br />
							<span className="text-green-dark dark:text-green-light">{t("Software com clareza e propósito.")}</span>
						</h3>
						<Text as="p" variant="cascadia-prose" className="md:mt-5">
							<HighlightedText>Especializado em .NET e React, com atuação do frontend à infraestrutura.</HighlightedText>
						</Text>
						<Text as="p" variant="cascadia-prose" className="md:mt-4">
							<HighlightedText>Uso de IA e documentação contextual para acelerar entregas e reduzir retrabalho.</HighlightedText>
						</Text>
					</div>
					<dl className="order-1 space-y-4 border-t border-slate-500/20 pt-4 md:order-none md:space-y-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
						<div>
							<dt className="font-tomorrow text-sm font-medium tracking-wider text-[#245b91] dark:text-[#76b6ec]">{t("O QUE DESENVOLVO")}</dt>
							<dd className="prose-text mt-2 text-base leading-relaxed"><HighlightedText>Sites, aplicações, APIs REST e automações.</HighlightedText></dd>
						</div>
						<div>
							<dt className="font-tomorrow text-sm font-medium tracking-wider text-[#245b91] dark:text-[#76b6ec]">{t("ONDE TENHO EXPERIÊNCIA")}</dt>
							<dd className="prose-text mt-2 text-base leading-relaxed"><HighlightedText>Mensageria, manutenção e evolução de sistemas.</HighlightedText></dd>
						</div>
						<div>
							<dt className="font-tomorrow text-sm font-medium tracking-wider text-[#245b91] dark:text-[#76b6ec]">{t("MEU FOCO")}</dt>
							<dd className="prose-text mt-2 text-base leading-relaxed"><HighlightedText>Desempenho, acessibilidade e facilidade de manutenção.</HighlightedText></dd>
						</div>
					</dl>
				</div>
				<p className="mt-6 flex items-start gap-2 border-t border-slate-500/20 pt-5 font-tomorrow text-sm">
					<MapPin size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
					{t("Rio de Janeiro - RJ, Brasil · Presencial, híbrido ou remoto")}
				</p>
			</SpotlightCard>
		</ScrollSection>
	);
}
