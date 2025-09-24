import { cva, type VariantProps } from "class-variance-authority";

export const iconVariants = cva("", {
	variants: {},
	defaultVariants: {},
});

interface IconProps
	extends React.ComponentProps<"svg">,
		VariantProps<typeof iconVariants> {
	svg: React.FC<React.ComponentProps<"svg">>;
}

export default function Icon({
	svg: SvgComponent,
	className,
	...props
}: IconProps) {
	return <SvgComponent className={iconVariants({ className })} {...props} />;
}
