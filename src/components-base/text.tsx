import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

export const textVariants = cva(
	"font-tomorrow transition-colors duration-[var(--duration-default)]",
	{
		variants: {
			variant: {
				"tomorrow-header-name": "text-3xl",
				"tomorrow-header-shortcut": "font-light",
				"tomorrow-impact": "text-6xl font-bold",
				"tomorrow-impact-sm":
					"text-xl font-extralight text-gray-900 dark:text-gray-300",

				"tomorrow-9xl": "text-9xl",
				"tomorrow-9xl-extralight": "text-9xl font-light",

				"tomorrow-8xl": "text-8xl",
				"tomorrow-8xl-extralight": "text-8xl font-light",

				"tomorrow-7xl": "text-7xl",
				"tomorrow-7xl-extralight": "text-7xl font-light",

				"tomorrow-6xl": "text-6xl",
				"tomorrow-6xl-extralight": "text-6xl font-light",

				"tomorrow-5xl": "text-5xl",
				"tomorrow-5xl-extralight": "text-5xl font-light",

				"tomorrow-4xl": "text-4xl",
				"tomorrow-4xl-extralight": "text-4xl font-light",

				"tomorrow-3xl": "text-3xl",
				"tomorrow-3xl-extralight": "text-3xl font-light",

				"tomorrow-2xl": "text-2xl",
				"tomorrow-2xl-extralight": "text-2xl font-light",

				"tomorrow-xl": "text-xl",
				"tomorrow-xl-extralight": "text-xl font-light",

				"tomorrow-lg": "text-lg",
				"tomorrow-lg-extralight": "text-lg font-light",

				"tomorrow-md": "text-md",
				"tomorrow-md-extralight": "text-md font-light",

				"tomorrow-sm": "text-sm",
				"tomorrow-sm-extralight": "text-sm font-light",

				"tomorrow-xs": "text-xs",
				"tomorrow-xs-extralight": "text-xs font-light",
			},
		},
		defaultVariants: {
			variant: "tomorrow-md",
		},
	},
);

interface TextProps extends VariantProps<typeof textVariants> {
	as?: keyof React.JSX.IntrinsicElements;
	className?: string;

	children?: React.ReactNode;
}

export default function Text({
	as = "span",
	variant,
	className,
	children,
	...props
}: TextProps) {
	return React.createElement(
		as,
		{
			className: textVariants({ variant, className }),
			...props,
		},
		children,
	);
}
