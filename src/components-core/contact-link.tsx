import { ArrowRight, Copy, ExternalLink } from "lucide-react";
import { type ReactNode, useEffect, useId, useRef, useState } from "react";
import Text from "../components-base/text";

interface ContactLinkProps {
	href?: string;
	label: string;
	copyValue?: string;
	copyLabel?: string;
	children: ReactNode;
}

export default function ContactLink({
	href,
	label,
	copyValue,
	copyLabel = "Copiar valor",
	children,
}: ContactLinkProps) {
	const [open, setOpen] = useState(false);
	const [copyStatus, setCopyStatus] = useState("");
	const container = useRef<HTMLDivElement>(null);
	const closeTimer = useRef<number | undefined>(undefined);
	const popupId = useId();

	useEffect(() => {
		if (!open) return;

		function closeOutside(event: PointerEvent) {
			if (!container.current?.contains(event.target as Node)) setOpen(false);
		}

		function closeOnEscape(event: KeyboardEvent) {
			if (event.key !== "Escape") return;
			if (container.current?.contains(document.activeElement)) {
				container.current
					.querySelector<HTMLElement>("[data-contact-trigger]")
					?.focus({ preventScroll: true });
			}
			setOpen(false);
		}

		document.addEventListener("pointerdown", closeOutside);
		document.addEventListener("keydown", closeOnEscape);
		return () => {
			window.clearTimeout(closeTimer.current);
			document.removeEventListener("pointerdown", closeOutside);
			document.removeEventListener("keydown", closeOnEscape);
		};
	}, [open]);

	function showPopup() {
		if (!open) setCopyStatus("");
		setOpen(true);
	}

	function isMobile() {
		return window.matchMedia("(max-width: 639px), (pointer: coarse)").matches;
	}

	async function copy(value: string) {
		try {
			await navigator.clipboard.writeText(value);
			setCopyStatus("Copiado!");
			window.clearTimeout(closeTimer.current);
			closeTimer.current = window.setTimeout(() => setOpen(false), 1000);
		} catch {
			setCopyStatus("Não foi possível copiar.");
		}
	}

	return (
		<div
			ref={container}
			className="relative"
			onPointerEnter={(event) => {
				if (event.pointerType === "mouse") showPopup();
			}}
			onPointerLeave={(event) => {
				if (
					event.pointerType === "mouse" &&
					!container.current?.contains(document.activeElement)
				)
					setOpen(false);
			}}
			onBlur={(event) => {
				if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
			}}
		>
			{href ? (
				<a
					data-contact-trigger
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					aria-expanded={open}
					aria-controls={popupId}
					onFocus={(event) => {
						if (event.currentTarget.matches(":focus-visible")) showPopup();
					}}
					onClick={(event) => {
						if (!isMobile()) return;
						event.preventDefault();
						showPopup();
					}}
					className="flex justify-center items-center gap-x-2 cursor-pointer underline underline-offset-4 hover:text-green-dark dark:hover:text-green-light expand-lg"
				>
					{children}
				</a>
			) : (
				<button
					data-contact-trigger
					type="button"
					aria-expanded={open}
					aria-controls={popupId}
					onFocus={(event) => {
						if (event.currentTarget.matches(":focus-visible")) showPopup();
					}}
					onClick={() => {
						showPopup();
						if (!isMobile()) void copy(copyValue ?? "");
					}}
					className="flex justify-center items-center gap-x-2 cursor-pointer underline underline-offset-4 sm:no-underline"
				>
					{children}
				</button>
			)}

			<div
				id={popupId}
				aria-hidden={!open}
				inert={!open}
				className={`absolute bottom-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 z-10 pb-3 origin-bottom sm:origin-bottom-left transition-all duration-[var(--duration-default)] ease-out motion-reduce:transition-none ${open ? "visible opacity-100 translate-y-0 scale-100" : "invisible opacity-0 translate-y-2 scale-95 pointer-events-none"}`}
			>
				<div
					role="group"
					aria-label={`Opções de ${label}`}
					className="flex flex-col gap-1 min-w-40 p-2 rounded-xl border border-gray-light dark:border-gray-medium bg-card-light dark:bg-card-dark text-gray-dark dark:text-gray-200 shadow-lg"
				>
					{href && (
						<>
							<a
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 p-2 rounded-md hover:bg-black/10 dark:hover:bg-white/10 hover:text-green-dark dark:hover:text-green-light focus-visible:outline-2 focus-visible:outline-green-light"
							>
								<ExternalLink size={16} aria-hidden="true" />
								<Text variant="tomorrow-sm">Ir para outra guia</Text>
							</a>
							<a
								href={href}
								className="flex items-center gap-2 p-2 rounded-md hover:bg-black/10 dark:hover:bg-white/10 hover:text-green-dark dark:hover:text-green-light focus-visible:outline-2 focus-visible:outline-green-light"
							>
								<ArrowRight size={16} aria-hidden="true" />
								<Text variant="tomorrow-sm">Abrir nesta guia</Text>
							</a>
						</>
					)}
					<button
						type="button"
						aria-live="polite"
						onClick={() => copy(href ?? copyValue ?? "")}
						className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 hover:text-green-dark dark:hover:text-green-light focus-visible:outline-2 focus-visible:outline-green-light"
					>
						<Copy size={16} aria-hidden="true" />
						<Text variant="tomorrow-sm">
							{copyStatus === "Copiado!"
								? copyStatus
								: href
									? "Copiar link"
									: copyLabel}
						</Text>
					</button>
					{href && copyValue && (
						<button
							type="button"
							onClick={() => copy(copyValue)}
							className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 hover:text-green-dark dark:hover:text-green-light focus-visible:outline-2 focus-visible:outline-green-light"
						>
							<Copy size={16} aria-hidden="true" />
							<Text variant="tomorrow-sm">{copyLabel}</Text>
						</button>
					)}
					{copyStatus && copyStatus !== "Copiado!" && (
						<span role="status" className="font-tomorrow text-xs">
							{copyStatus}
						</span>
					)}
				</div>
			</div>
		</div>
	);
}
