import Text from "../components-base/text";
import HighlightedText from "./highlighted-text";

interface TecnologyProps {
	name: string;
}

export default function Tecnology({ name: tecnologyName }: TecnologyProps) {
	return (
		<div
			className="
         flex
         justify-center items-center
			h-6
         p-1
			border-gray-500 border-1
         bg-gray-300 dark:bg-cyan-800
         rounded-md"
		>
			<Text variant="tomorrow-sm-extralight">
				<HighlightedText>{tecnologyName}</HighlightedText>
			</Text>
			<br />
		</div>
	);
}
