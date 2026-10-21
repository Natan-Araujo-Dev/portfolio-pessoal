import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ChevronDown, X } from "lucide-react";

export default function AboutDetails({ children }: { children: ReactNode }) {
	const [open, setOpen] = useState(false);
	const dialog = useRef<HTMLDialogElement>(null);
	const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const titleId = useId();
	const closeDialog = () => {
		dialog.current?.classList.add("is-closing");
		closeTimer.current = setTimeout(() => setOpen(false), 180);
	};

	useEffect(() => {
		const element = dialog.current;
		if (!open || !element) return;
		const overflow = document.body.style.overflow;
		element.showModal();
		document.body.style.overflow = "hidden";
		return () => {
			if (closeTimer.current) clearTimeout(closeTimer.current);
			element.close();
			element.classList.remove("is-closing");
			document.body.style.overflow = overflow;
		};
	}, [open]);

	return (
		<>
			<button type="button" className="project-link mt-6" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}>
				Mais sobre mim <ChevronDown className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`} size={17} aria-hidden="true" />
			</button>
			<dialog ref={dialog} className="about-dialog" data-card data-lenis-prevent aria-labelledby={titleId} onClose={() => setOpen(false)}
				onCancel={(event) => { event.preventDefault(); closeDialog(); }}
				onClick={(event) => {
					if (event.target !== event.currentTarget) return;
					const bounds = event.currentTarget.getBoundingClientRect();
					if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDialog();
				}}>
				<div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-slate-500/20 bg-card-light p-6 dark:bg-card-dark sm:px-8">
					<h3 id={titleId} className="font-tomorrow text-xl font-medium text-green-dark dark:text-green-light">Mais sobre mim</h3>
					<button type="button" className="flex min-h-11 min-w-11 items-center justify-center rounded-lg" aria-label="Fechar mais sobre mim" onClick={closeDialog} autoFocus>
						<X size={22} aria-hidden="true" />
					</button>
				</div>
				<div className="p-6 sm:p-8">{children}</div>
			</dialog>
		</>
	);
}
