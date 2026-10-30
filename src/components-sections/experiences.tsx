import ScrollSection from "../components-core/scroll-section";
import Text from "../components-base/text";
import ExperienceCardSwap from "../components-core/experience-card-swap";
import LaserFlow from "../components-core/LaserFlow";

export default function Experiences() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <ids estáticos>
		<ScrollSection
			id="experiencia-profissional"
			className="
			custom-section relative isolate
         gap-y-10"
		>
			<LaserFlow data-scroll-background aria-hidden="true" className="experience-laser" beamPosition={0.2} intensity={0.3} spread={2} dust={2} pulse={1.95} revealRadius={400} beamWidth={1.55} spill={2} streaks={2} speed={3} revealOpacity={0.5} flare={1.35} fog={0} dots={2} seed={20} />
			<div className="max-w-full rounded-2xl border border-slate-500/20 bg-card-light px-6 py-4 shadow-lg dark:bg-card-dark sm:px-8">
				<Text as="h2" variant="tomorrow-section">Experiência profissional</Text>
			</div>

			<ExperienceCardSwap />

		</ScrollSection>
	);
}
