import Footer from "./components-skeleton/footer";
import Header from "./components-skeleton/header";
import MainContent from "./components-skeleton/main-content";
import MiddleScroll from "./components-core/middle-scroll";
import SmoothScroll from "./components-core/smooth-scroll";
import AnimatedContent from "./components-core/animated-content";
import ButtonEffects from "./components-core/button-effects";

function App() {
	return (
		<div
			className="
			flex flex-col
			justify-center items-center
			w-full min-h-screen"
		>
			<AccessibilityMenu />
			<Header />
			<MainContent />
			<Footer />
			<MiddleScroll />
			<SmoothScroll />
			<AnimatedContent />
			<ButtonEffects />
		</div>
	);
}

export default App;
import AccessibilityMenu from "./components-core/accessibility-menu";
