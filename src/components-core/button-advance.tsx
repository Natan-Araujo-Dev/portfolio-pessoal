import { ArrowDown } from "lucide-react";

interface ButtonAdvanceProps {
	href: string;
}

export default function ButtonAdvance({ href }: ButtonAdvanceProps) {
	return (
		<div className="inline-flex animate-bounce [animation-duration:1.8s]">
			<a href={href} className="expand-lg fill-color">
				<ArrowDown size="40px" />
			</a>
		</div>
	);
}
