import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

export const textVariants = cva("font-tomorrow", {
	variants: {
		variant: {
			"tomorrow-header-name": "text-3xl",
			"tomorrow-header-shortcut": "font-light",
			"tomorrow-impact": "text-6xl font-bold",
			"tomorrow-impact-sm": "text-xl font-extralight",

			"tomorrow-3xl": "text-3xl font-light",
			"tomorrow-2xl": "text-2xl font-light",
			"tomorrow-xl": "text-xl font-light",
			"tomorrow-lg": "text-lg font-light",
			"tomorrow-md": "text-md font-light",
			"tomorrow-md-bold": "text-md font-bold",
			"tomorrow-sm": "text-sm font-light",
			"tomorrow-xs": "text-xs font-light",
		},
	},
	defaultVariants: {
		variant: "tomorrow-md",
	},
});

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
