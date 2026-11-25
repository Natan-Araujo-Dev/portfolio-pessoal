export default async function copyText(value: string, container: HTMLElement) {
	if (!value) return false;

	if (navigator.clipboard?.writeText) {
		try {
			await navigator.clipboard.writeText(value);
			return true;
		} catch {
			// Tenta copiar pela seleção quando o navegador recusa a API.
		}
	}

	const previous = document.activeElement;
	const field = document.createElement("textarea");
	field.value = value;
	field.readOnly = true;
	field.tabIndex = -1;
	field.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none;font-size:16px";
	container.append(field);

	try {
		field.focus({ preventScroll: true });
		field.select();
		field.setSelectionRange(0, value.length);
		return document.execCommand("copy");
	} catch {
		return false;
	} finally {
		field.remove();
		if (previous instanceof HTMLElement && previous.isConnected) previous.focus({ preventScroll: true });
	}
}
