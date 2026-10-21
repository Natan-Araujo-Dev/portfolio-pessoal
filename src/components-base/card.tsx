import type React from "react";
import SpotlightCard from "../components-core/spotlight-card";

interface CardProps {
	className?: string;

	children?: React.ReactNode;
}

export default function Card({ className, children }: CardProps) {
	return (
		<SpotlightCard
			spotlightColor="#2596be"
			intensity={0.22}
			smoothing={0.1}
			className={className}
		>
			{children}
		</SpotlightCard>
	);
}
