import { ArrowDown } from "lucide-react";

interface ButtonAdvanceProps {
	href: string;
}

export default function ButtonAdvance({ href }: ButtonAdvanceProps) {
	return (
		<div className="inline-flex animate-bounce [animation-duration:1.8s]">
			<div
				className="
				hidden lg:flex"
			>
				<a href={href} className="expand-lg fill-color">
					<ArrowDown size="40px" />
				</a>
			</div>

			<div
				className="
				lg:hidden"
			>
				<a href={href} className="expand-lg fill-color">
					<ArrowDown size="30px" />
				</a>
			</div>
		</div>
	);
}
