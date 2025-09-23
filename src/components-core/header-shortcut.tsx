import Text from "../components-base/text";

export default function HeaderShortcuts() {
	return (
		<div
			className="
         flex flex-row
         justify-center items-center
         gap-x-4"
		>
			<a href="#sobre" className="expand-lg fill-color">
				<Text variant="tomorrow-header-shortcut">Sobre</Text>
			</a>
			<a href="#habilidades" className="expand-lg fill-color">
				<Text variant="tomorrow-header-shortcut">Habilidades</Text>
			</a>
			<a href="#projetos" className="expand-lg fill-color">
				<Text variant="tomorrow-header-shortcut">Projetos</Text>
			</a>
			<a href="#contato" className="expand-lg fill-color">
				<Text variant="tomorrow-header-shortcut">Contato</Text>
			</a>
		</div>
	);
}
