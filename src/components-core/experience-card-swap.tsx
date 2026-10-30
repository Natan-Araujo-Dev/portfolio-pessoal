import { useEffect, useRef, useState } from "react";
import CardSwap, { Card } from "./CardSwap";
import ExperiencePixelCard from "./experience-pixel-card";
import { experiencesList } from "../objects/experiencesList";

export default function ExperienceCardSwap() {
	const container = useRef<HTMLDivElement>(null);
	const [size, setSize] = useState({ width: 360, height: 400 });
	useEffect(() => {
		const element = container.current;
		if (!element) return;
		const update = () => {
			const width = Math.max(40, Math.min(560, element.clientWidth - 100));
			const height = Math.max(200, ...Array.from(element.querySelectorAll<HTMLElement>("[data-card]"), card => {
				const content = Array.from(card.children).filter((child): child is HTMLElement => child instanceof HTMLElement && getComputedStyle(child).position !== "absolute");
				if (getComputedStyle(card).display === "grid") {
					content.push(...card.querySelectorAll<HTMLElement>(".card-details-toggle, .card-details-content"));
				}
				return Math.ceil(Math.max(0, ...content.map(child => child.offsetTop + child.offsetHeight)) + parseFloat(getComputedStyle(card).paddingBottom));
			}));
			setSize(previous => previous.width === width && previous.height === height ? previous : { width, height });
		};
		const observer = new ResizeObserver(update);
		observer.observe(element);
		element.querySelectorAll("[data-card]").forEach(card => observer.observe(card));
		element.querySelectorAll(".card-details, .card-details-content").forEach(details => observer.observe(details));
		update();
		return () => { observer.disconnect(); };
	}, []);
	return (
		<div ref={container} className="w-full max-w-3xl experience-card-swap">
			<CardSwap width={size.width} height={size.height} depth={0} visibleCards={2} bounce={0.25} dim={0.25} cardDistance={26} skewAmount={0} delay={1500} autoplay={false} parallax={0} verticalDistance={60} speed={0.9} hoverSpread={0.19}>
				{experiencesList.map(experience => <Card key={experience.title}><ExperiencePixelCard skill={experience} /></Card>)}
			</CardSwap>
		</div>
	);
}
