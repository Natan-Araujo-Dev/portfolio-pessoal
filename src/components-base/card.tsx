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
         bg-card-light/90 dark:bg-card-dark/95
         transition-all
         duration-[var(--duration-default)] ease-in-out
         shadow-card-shadow-light dark:shadow-card-shadow-dark
         shadow-none
         hover:shadow-[0_4px_6px_2px_rgba(0,0,0,0.1),0_-4px_6px_-2px_rgba(0,0,0,0.1)]
			expand-sm
         ${className}`}
		>
			{children}
		</div>
	);
}
