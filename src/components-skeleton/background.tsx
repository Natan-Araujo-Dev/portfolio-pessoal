import type { CSSProperties } from "react";
import { drapeConfig } from "../common/drape-config";
import ParticleDrape from "../components-core/particle-drape";

export default function Background() {
	return (
		<div
			data-scroll-background
			aria-hidden="true"
			style={{
				"--drape-background-light": drapeConfig.backgroundColor.light,
				"--drape-background-dark": drapeConfig.backgroundColor.dark,
			} as CSSProperties}
			className="
         absolute inset-0 pointer-events-none overflow-hidden
         w-full h-full
         top-0 left-0
         -z-10
			bg-[var(--drape-background-light)] dark:bg-[var(--drape-background-dark)]"
		>
			<ParticleDrape visibilitySelector="#inicio > .scroll-panel" />
		</div>
	);
}
