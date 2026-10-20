import type React from "react";

interface CardProps {
	className?: string;

	children?: React.ReactNode;
}

export default function Card({ className, children }: CardProps) {
	return (
		<div
			data-card
			className={`
         rounded-2xl
         bg-card-light/70 dark:bg-card-dark/95
         transition-all
         duration-[var(--duration-default)] ease-linear
         shadow-lg shadow-black/30
         hover:shadow-[#2596be] dark:hover:shadow-card-shadow-dark
         hover:shadow-[0_0_20px_4px_rgba(0,0,0,0.2)]
			expand-sm
			backdrop-blur-xs
         ${className}`}
		>
			{children}
		</div>
	);
}
