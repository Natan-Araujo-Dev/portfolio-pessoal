import ScrollSection from "../components-core/scroll-section";
import Text from "../components-base/text";
import CardSkill from "../components-core/card-skill";
import { experiencesList } from "../objects/experiencesList";

export default function Experiences() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <ids estáticos>
		<ScrollSection
			id="experiencia-profissional"
			className="
			custom-section relative isolate
         gap-y-10"
		>
			<div className="max-w-full rounded-2xl border border-slate-500/20 bg-card-light px-6 py-4 shadow-lg dark:bg-card-dark sm:px-8">
				<Text as="h2" variant="tomorrow-section">Experiência profissional</Text>
			</div>

			<div
				className="
				grid w-full max-w-6xl grid-cols-1 md:grid-cols-2
				items-start gap-5 sm:gap-6"
			>
				{experiencesList.map((experience) => (
					<CardSkill key={experience.title} skill={experience} prose />
				))}
			</div>

		</ScrollSection>
	);
}
