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
		<ScrollSection id="sobre" className="custom-section about-pattern gap-y-5 md:gap-y-10">
			<TextPatternBackground text={t("sobre mim ·")} fontSize={28} gap={12} separatorGap={4} scrollReveal />
			<SpotlightCard spotlightColor="#2596be" intensity={0.22} smoothing={0.1}
				className="w-full max-w-4xl p-3 sm:p-6 md:p-8 text-gray-dark dark:text-gray-200">
				<div className="grid gap-3 md:grid-cols-2 md:gap-8">
					<div className="contents md:block">
						<h3 className="font-tomorrow text-base font-semibold leading-snug tracking-tight sm:text-xl md:text-2xl max-md:border-b max-md:border-slate-500/20 max-md:pb-3">
							{t("Desenvolvedor FullStack.")}<br />
							<span className="text-green-dark dark:text-green-light">{t("Software com clareza e propósito.")}</span>
						</h3>
						<Text as="p" variant="cascadia-prose" className="text-sm leading-tight md:mt-5 md:text-base md:leading-relaxed">
							<HighlightedText>Especializado em .NET e React, com atuação do frontend à infraestrutura.</HighlightedText>
						</Text>
						<Text as="p" variant="cascadia-prose" className="text-sm leading-tight md:mt-4 md:text-base md:leading-relaxed">
							<HighlightedText>Uso de IA e documentação contextual para acelerar entregas e reduzir retrabalho.</HighlightedText>
						</Text>
					</div>
					<dl className="order-1 space-y-3 border-t border-slate-500/20 pt-3 md:order-none md:space-y-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
						<div>
							<dt className="font-tomorrow text-xs font-medium tracking-wider text-[#245b91] dark:text-[#76b6ec] md:text-sm">{t("O QUE DESENVOLVO")}</dt>
							<dd className="prose-text mt-0.5 text-sm leading-tight md:mt-2 md:text-base md:leading-relaxed"><HighlightedText>Sites, aplicações, APIs REST e automações.</HighlightedText></dd>
						</div>
						<div>
							<dt className="font-tomorrow text-xs font-medium tracking-wider text-[#245b91] dark:text-[#76b6ec] md:text-sm">{t("ONDE TENHO EXPERIÊNCIA")}</dt>
							<dd className="prose-text mt-0.5 text-sm leading-tight md:mt-2 md:text-base md:leading-relaxed"><HighlightedText>Mensageria, manutenção e evolução de sistemas.</HighlightedText></dd>
						</div>
						<div>
							<dt className="font-tomorrow text-xs font-medium tracking-wider text-[#245b91] dark:text-[#76b6ec] md:text-sm">{t("MEU FOCO")}</dt>
							<dd className="prose-text mt-0.5 text-sm leading-tight md:mt-2 md:text-base md:leading-relaxed"><HighlightedText>Desempenho, acessibilidade e facilidade de manutenção.</HighlightedText></dd>
						</div>
					</dl>
				</div>
				<p className="mt-4 flex items-start gap-2 border-t border-slate-500/20 pt-4 font-tomorrow text-xs sm:text-sm">
					<MapPin size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
					{t("Rio de Janeiro - RJ, Brasil · Presencial, híbrido ou remoto")}
				</p>
			</SpotlightCard>
		</ScrollSection>
	);
}
