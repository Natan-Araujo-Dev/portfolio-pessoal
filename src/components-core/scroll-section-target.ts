export function getNextScrollSection(scene: HTMLElement) {
	const target = scene.dataset.overlapTarget;
	return target ? document.getElementById(target) : scene.nextElementSibling;
}
