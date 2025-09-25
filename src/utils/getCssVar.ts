export const getCssVar = (
	name: string,
	el: Element = document.documentElement,
): string => getComputedStyle(el).getPropertyValue(name).trim();
