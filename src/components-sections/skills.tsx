import { useState } from "react";
import Text from "../components-base/text";
import OrbitImages from "../components-core/OrbitImages";
import ScrollSection from "../components-core/scroll-section";
import Tecnology from "../components-core/tecnology";
import { mainSkillsList } from "../objects/mainSkillsList";
import "./portfolio-showcase.css";

const areas = mainSkillsList.map(({ title }) => ({ label: title }));

export default function Skills() {
	const [frontIndex, setFrontIndex] = useState(0);
	const skill = mainSkillsList[frontIndex] ?? mainSkillsList[0];
	const details = (
		<>
			<Text as="h3" variant="tomorrow-xs" className="skills-orbit-category">{skill.title}</Text>
			<ul>
				{skill.skills.map(tech => <li key={tech}><Tecnology name={tech} /></li>)}
			</ul>
		</>
	);

	return (
		<ScrollSection id="habilidades" className="custom-section">
			<div className="skills-orbit-layout w-full max-w-6xl">
				<OrbitImages
					className="skills-orbit"
					images={areas}
					activeIndex={frontIndex}
					onFrontChange={setFrontIndex}
					onItemClick={setFrontIndex}
					holdOnClick
					touchDragFromFront
					easing="easeIn"
					itemSize={104}
					radiusX={430}
					radiusY={160}
					showPath
					pathDash={8}
					duration={25}
					rotation={-9}
					hoverScale={1.5}
					depth={1}
					itemRadius={6}
					hoverSpeed={1}
					centerContent={
						<div className="skills-orbit-center">
							<Text as="h2" variant="tomorrow-section">HABILIDADES</Text>
							<div className="skills-orbit-details">
								{details}
							</div>
						</div>
					}
				/>
				<div className="skills-orbit-details skills-orbit-details-compact">
					{details}
				</div>
			</div>
		</ScrollSection>
	);
}
