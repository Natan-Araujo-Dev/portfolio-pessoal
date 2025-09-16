import FinisherHeader from "../core/finisher-header";

export default function Background() {
	return (
		<div
			className="
         fixed inset-0
         flex
         justify-center items-center
         w-full h-full
         top-0 left-0
         z-0
			bg-amber-50"
		>
			<FinisherHeader />
		</div>
	);
}
