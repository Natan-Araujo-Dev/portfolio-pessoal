import type Lenis from "lenis";

let scroller: Lenis | null = null;
export let programmaticScroll = false;

export function setSmoothScroller(instance: Lenis | null) {
	scroller = instance;
}

export function setProgrammaticScroll(active: boolean) {
	programmaticScroll = active;
	if (active && scroller?.isScrolling === "smooth") {
		scroller.stop();
		scroller.start();
	}
}
