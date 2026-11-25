import { useEffect, useState } from "react";

export const MOBILE_MEDIA_QUERY = "(max-width: 767px), (pointer: coarse)";

export default function useMobile() {
	const [mobile, setMobile] = useState(() => matchMedia(MOBILE_MEDIA_QUERY).matches);
	useEffect(() => {
		const media = matchMedia(MOBILE_MEDIA_QUERY);
		const sync = () => setMobile(media.matches);
		media.addEventListener("change", sync);
		return () => media.removeEventListener("change", sync);
	}, []);
	return mobile;
}
