import { MapPin } from "lucide-react";
import ScrollSection from "../components-core/scroll-section";
import Text from "../components-base/text";
import TextPatternBackground from "../components-core/text-pattern-background";
import SpotlightCard from "../components-core/spotlight-card";
import HighlightedText from "../components-core/highlighted-text";

export default function About() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <ids estáticos>
		<ScrollSection id="sobre" className="custom-section about-pattern gap-y-10">
			<TextPatternBackground text="sobre mim ·" fontSize={28} gap={12} separatorGap={4} scrollReveal />
			<SpotlightCard spotlightColor="#2596be" intensity={0.22} smoothing={0.1}
				className="w-full max-w-5xl p-6 sm:p-8 text-gray-dark dark:text-gray-200">
				<div className="grid gap-4 md:grid-cols-2 md:gap-8">
					<div className="contents md:block">
						<h3 className="font-tomorrow text-xl font-semibold leading-snug tracking-tight sm:text-2xl max-md:border-b max-md:border-slate-500/20 max-md:pb-4">
							Desenvolvedor FullStack.<br />
							<span className="text-green-dark dark:text-green-light">Software com clareza e propósito.</span>
						</h3>
						<Text as="p" variant="cascadia-prose" className="md:mt-5">
							<HighlightedText>Especializado em .NET e React, com atuação do frontend à infraestrutura.</HighlightedText>
						</Text>
						<Text as="p" variant="cascadia-prose" className="md:mt-4">
							Uso de <Text className="text-[#80448a] dark:text-[#D8A0DF]">IA</Text> e{" "}
							<Text className="text-[#276478] dark:text-[#9CDCFE]">documentação contextual</Text> para{" "}
							<Text className="text-[#52692c] dark:text-[#B5CEA8]">acelerar entregas</Text> e{" "}
							<Text className="text-[#52692c] dark:text-[#B5CEA8]">reduzir retrabalho</Text>.
						</Text>
					</div>
					<dl className="order-1 space-y-4 border-t border-slate-500/20 pt-4 md:order-none md:space-y-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
						<div>
							<dt className="font-tomorrow text-sm font-medium tracking-wider text-[#245b91] dark:text-[#76b6ec]">O QUE DESENVOLVO</dt>
							<dd className="prose-text mt-2 text-base leading-relaxed"><HighlightedText>Sites, aplicações, APIs REST e </HighlightedText><Text className="text-[#80448a] dark:text-[#D8A0DF]">automações</Text>.</dd>
						</div>
						<div>
							<dt className="font-tomorrow text-sm font-medium tracking-wider text-[#245b91] dark:text-[#76b6ec]">ONDE TENHO EXPERIÊNCIA</dt>
							<dd className="prose-text mt-2 text-base leading-relaxed"><HighlightedText>Mensageria, manutenção e evolução de sistemas.</HighlightedText></dd>
						</div>
						<div>
							<dt className="font-tomorrow text-sm font-medium tracking-wider text-[#245b91] dark:text-[#76b6ec]">MEU FOCO</dt>
							<dd className="prose-text mt-2 text-base leading-relaxed"><HighlightedText>Desempenho, acessibilidade e facilidade de manutenção.</HighlightedText></dd>
						</div>
					</dl>
				</div>
				<p className="mt-6 flex items-start gap-2 border-t border-slate-500/20 pt-5 font-tomorrow text-sm">
					<MapPin size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
					Rio de Janeiro - RJ, Brasil · Presencial, híbrido ou remoto
				</p>
			</SpotlightCard>
		</ScrollSection>
	);
}
