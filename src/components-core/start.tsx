/** biome-ignore-all lint/correctness/useUniqueElementIds: <ids estáticos> */

import { ArrowDown } from "lucide-react";
import Text from "../components-base/text";

export default function Start() {
	return (
		<div
			id="inicio"
			className="
			custom-section
			gap-y-5"
		>
			<div>
				<Text variant="tomorrow-impact">
					Bem vindo(a) ao meu site. <br />
					Meu nome é{" "}
					<Text variant="tomorrow-impact" className="text-green-600">
						Natan Araujo
					</Text>
					.
				</Text>
			</div>

			<div className="flex justify-center">
				<Text variant="tomorrow-impact-sm">
					Desenvolvedor FullStack | Engenheiro de Software
				</Text>
			</div>

			<div className="inline-flex animate-bounce [animation-duration:1.8s]">
				<a href="#sobre" className="expand-lg fill-color">
					<ArrowDown />
				</a>
			</div>
		</div>
	);
}
