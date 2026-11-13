import { lazy, Suspense, useEffect, useRef, useState, type ComponentType } from "react";
import type { LaserFlowProps } from "../components-core/LaserFlow";
import ScrollSection from "../components-core/scroll-section";
import Text from "../components-base/text";
import ExperienceCardSwap from "../components-core/experience-card-swap";

const LaserFlow = lazy<ComponentType<LaserFlowProps>>(() => import("../components-core/LaserFlow").catch((error: unknown) => {
	console.warn("Falha ao carregar o efeito de Experiência.", error);
	return { default: () => null };
}));

export default function Experiences() {
	const background = useRef<HTMLDivElement>(null);
	const [showLaser, setShowLaser] = useState(false);

	useEffect(() => {
		const element = background.current;
		if (!element) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (!entry.isIntersecting) return;
			setShowLaser(true);
			observer.disconnect();
		}, { rootMargin: "0px 0px 240px" });
		observer.observe(element);
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
			<div ref={background} data-scroll-background aria-hidden="true" className="experience-laser">
				{showLaser && (
					<Suspense fallback={null}>
						<LaserFlow beamPosition={0.2} intensity={0.3} spread={2} dust={2} pulse={1.95} revealRadius={400} beamWidth={1.55} spill={2} streaks={2} speed={3} revealOpacity={0.5} flare={1.35} fog={0} dots={2} seed={20} />
					</Suspense>
				)}
			</div>
			<div className="max-w-full rounded-2xl border border-slate-500/20 bg-card-light px-6 py-4 shadow-lg dark:bg-card-dark sm:px-8">
				<Text as="h2" variant="tomorrow-section">Experiência profissional</Text>
			</div>

			<ExperienceCardSwap />

		</ScrollSection>
	);
}
