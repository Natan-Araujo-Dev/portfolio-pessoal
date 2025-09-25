import FinisherHeaderDark from "../components-core/finisher-header-dark";
import FinisherHeaderLight from "../components-core/finisher-header-light";

export default function Background() {
	return (
		<div
			className="
         fixed inset-0
         w-full h-full
         top-0 left-0
         z-0
			bg-gray-background dark:bg-blue-background"
		>
			<FinisherHeaderDark />

			<FinisherHeaderLight />
		</div>
	);
}
