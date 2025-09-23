import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

export const textVariants = cva("font-tomorrow", {
	variants: {
		variant: {
			"tomorrow-header-name": "text-3xl",
			"tomorrow-header-shortcut": "",
			"tomorrow-impact": "",
			"tomorrow-footer": "",

			"tomorrow-3xl": "text-3xl",
			"tomorrow-2xl": "text-2xl",
			"tomorrow-xl": "text-xl",
			"tomorrow-lg": "text-lg",
			"tomorrow-md": "",
			"tomorrow-md-bold": "font-bold",
			"tomorrow-sm": "text-sm",
			"tomorrow-xs": "text-xs",
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
