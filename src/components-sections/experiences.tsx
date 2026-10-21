import ScrollSection from "../components-core/scroll-section";
import Text from "../components-base/text";
import ButtonAdvance from "../components-core/button-advance";
import CardSkill from "../components-core/card-skill";
import { experiencesList } from "../objects/experiencesList";
import DriftWall from "../components-core/drift-wall";

const images = import.meta.glob<string>("../assets/experience-wall/*.jpg", {
	query: "?url", import: "default", eager: true,
});
const wallItems = Object.values(images).map((image) => ({ image }));

export default function Experiences() {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <ids estáticos>
		<ScrollSection
			id="experiencia-profissional"
			className="
			custom-section relative isolate
         gap-y-10"
		>
			<div className="experience-wall pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-xl bg-[var(--experience-background)] sm:inset-x-10 lg:inset-x-16" data-scroll-background aria-hidden="true">
				<DriftWall items={wallItems} overlayColor="#000000" columns={4}
					tileWidth={212} tileHeight={140} gap={12} radius={4}
					perspective={2400} lift={76} speed={12} turn={0}
					depth={0} fade={0} variance={0} parallax={0} dim={1} pauseOnHover={false} />
			</div>
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

			<ButtonAdvance href="#habilidades" />
		</ScrollSection>
	);
}
