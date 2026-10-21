import ScrollSection from "../components-core/scroll-section";
/** biome-ignore-all lint/correctness/useUniqueElementIds: <ids estáticos> */
import Text from "../components-base/text";
import ButtonAdvance from "../components-core/button-advance";
import ShinyText, { SHINY_TEXT_COLOR } from "../components-core/shiny-text";

export default function Start() {
	return (
		<ScrollSection
			id="inicio"
			className="
			custom-section"
		>
			<StartDesktop />
			<StartMobile />
		</ScrollSection>
	);
}

function StartDesktop() {
	return (
		<div
			className="
			
			flex-col
			justify-center items-center
			hidden lg:flex
			gap-y-5"
		>
			<div>
				<Text variant="tomorrow-impact">
					Bem vindo(a) ao meu site. <br />
					Meu nome é{" "}
					<Text variant="tomorrow-impact" className="text-green-dark">
						Natan Araujo
					</Text>
					.
				</Text>
			</div>

			<div className="flex justify-center">
				<Text variant="tomorrow-impact-sm" className="font-semibold">
					<ShinyText
						color="currentColor"
						shineColor={SHINY_TEXT_COLOR}
						speed={3}
						delay={1}
						style={{ fontWeight: 400 }}
						text="Desenvolvedor FullStack | Engenheiro de Software | Prompt Engineering"
					/>
				</Text>
			</div>

			<ButtonAdvance href="#sobre" />
		</div>
	);
}

function StartMobile() {
	return (
		<div
			className="
			flex flex-col
			justify-center items-center
			lg:hidden
			w-full px-4 sm:px-6
			gap-y-5"
		>
			<div>
				<Text variant="tomorrow-impact">
					Bem vindo(a)
					<br /> ao meu site.
					<br /> Meu nome é <br />
					<Text variant="tomorrow-impact" className="text-green-dark">
						Natan Araujo
					</Text>
					.
				</Text>
			</div>

			<div className="flex justify-center text-center">
				<Text
					variant="tomorrow-impact-sm"
					className="leading-relaxed font-extrabold"
				>
					<ShinyText
						color="currentColor"
						shineColor={SHINY_TEXT_COLOR}
						speed={5}
						delay={0}
						style={{ fontWeight: 400 }}
					>
						Desenvolvedor FullStack | Engenheiro
						<br />
						de Software | Prompt Engineering
					</ShinyText>
				</Text>
			</div>

			<ButtonAdvance href="#sobre" />
		</div>
	);
}
