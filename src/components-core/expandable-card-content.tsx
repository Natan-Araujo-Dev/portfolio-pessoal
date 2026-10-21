import { useId, useState, type ReactNode } from "react";

interface ExpandableCardContentProps {
	label: string;
	ariaLabel: string;
	children: ReactNode;
}

export default function ExpandableCardContent({ label, ariaLabel, children }: ExpandableCardContentProps) {
	const [expanded, setExpanded] = useState(false);
	const contentId = useId();

	return (
		<div className="card-details">
			<button
				type="button"
				className="card-details-toggle"
				aria-label={ariaLabel}
				aria-expanded={expanded}
				aria-controls={contentId}
				onClick={() => setExpanded((value) => !value)}
			>
				{label}
			</button>
			<div id={contentId} className={`card-details-content${expanded ? " is-expanded" : ""}`} aria-hidden={!expanded}>
				<div className="card-details-inner">{children}</div>
			</div>
		</div>
	);
}
