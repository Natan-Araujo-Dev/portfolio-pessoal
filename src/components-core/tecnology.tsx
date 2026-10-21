import Text from "../components-base/text";
import HighlightedText from "./highlighted-text";

interface TecnologyProps {
	name: string;
}

export default function Tecnology({ name: tecnologyName }: TecnologyProps) {
	return (
		<span className="inline-flex max-w-full rounded-md border border-emerald-900/15 bg-emerald-950/5 px-2.5 py-1 dark:border-slate-400/20 dark:bg-slate-900/35">
			<Text variant="tomorrow-sm" className="leading-snug">
				<HighlightedText>{tecnologyName}</HighlightedText>
			</Text>
		</span>
	);
}
