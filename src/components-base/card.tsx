import type React from "react";

interface CardProps {
	className?: string;

	children?: React.ReactNode;
}

export default function Card({ className, children }: CardProps) {
	return (
		<div
			className={`
         rounded-2xl
         bg-card-light/70 dark:bg-card-dark/95
         transition-all
         duration-[var(--duration-default)] ease-in-out
         shadow-card-shadow-light dark:shadow-card-shadow-dark
         shadow-none
         hover:shadow-[0_0_20px_4px_rgba(0,0,0,0.2)]
			expand-sm
			backdrop-blur-xs
         ${className}`}
		>
			{children}
		</div>
	);
}
