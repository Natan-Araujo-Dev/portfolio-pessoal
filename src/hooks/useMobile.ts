import { useEffect, useState } from "react";

export default function useMobile() {
	const [mobile, setMobile] = useState(() => matchMedia("(max-width: 767px), (pointer: coarse)").matches);
	useEffect(() => {
		const media = matchMedia("(max-width: 767px), (pointer: coarse)");
		const sync = () => setMobile(media.matches);
		media.addEventListener("change", sync);
		return () => media.removeEventListener("change", sync);
	}, []);
	return mobile;
}
