import { cva, type VariantProps } from "class-variance-authority";
import Icon from "./icon";

export const buttonIconVariants = cva(
	`
   inline-flex
   justify-center items-center
   cursor-pointer transition group
	box-content
   `,
	{
		variants: {
			variant: {},
		},
		defaultVariants: {},
	},
);

export const ButtonIconIconVariants = cva(`transition p-0.5`, {
	variants: {
		variant: {},
	},
	defaultVariants: {},
});

interface ButtonIconProps
	extends VariantProps<typeof buttonIconVariants>,
		Omit<React.ComponentProps<"button">, "size" | "disabled"> {
	icon: React.ComponentProps<typeof Icon>["svg"];
}

export default function ButtonIcon({
	className,
	icon,
	...props
}: ButtonIconProps) {
	return (
		<button
			className={buttonIconVariants({
				className,
			})}
			{...props}
		>
			<Icon svg={icon} />
		</button>
	);
}
