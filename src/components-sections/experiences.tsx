import { lazy, Suspense, useEffect, useRef, useState } from "react";
import ScrollSection from "../components-core/scroll-section";
import Text from "../components-base/text";
import CardSkill from "../components-core/card-skill";
import { experiencesList } from "../objects/experiencesList";
const DriftWall = lazy(() => import("../components-core/drift-wall"));

const images = import.meta.glob<string>("../assets/experience-wall/*.jpg", {
	query: "?url", import: "default", eager: true,
});
const mobileImages = import.meta.glob<string>("../assets/experience-wall/mobile/*.webp", {
	query: "?url", import: "default", eager: true,
});
const wallItems = Object.entries(images).map(([path, image]) => ({
	image,
	mobileImage: mobileImages[path.replace(/\/([^/]+)\.jpg$/, "/mobile/$1.webp")],
}));

export default function Experiences() {
	const wall = useRef<HTMLDivElement>(null);
	const [wallReady, setWallReady] = useState(false);
	useEffect(() => {
		if (!wall.current) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (!entry.isIntersecting) return;
			setWallReady(true);
			observer.disconnect();
		}, { rootMargin: "500px" });
		observer.observe(wall.current);
		return () => observer.disconnect();
	}, []);
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: <ids estáticos>
		<ScrollSection
			id="experiencia-profissional"
			className="
			custom-section relative isolate
         gap-y-10"
		>
			<div ref={wall} className="experience-wall pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-xl bg-[var(--experience-background)] sm:inset-x-10 lg:inset-x-16" data-scroll-background aria-hidden="true">
				{wallReady && <Suspense fallback={null}>
				<DriftWall items={wallItems} overlayColor="#000000" columns={4}
					tileWidth={212} tileHeight={140} gap={12} radius={4}
					perspective={2400} lift={76} speed={12} turn={0}
					depth={0} fade={0} variance={0} parallax={0} dim={1} pauseOnHover={false} />
				</Suspense>}
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

		</ScrollSection>
	);
}
