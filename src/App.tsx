import Footer from "./components-skeleton/footer";
import Header from "./components-skeleton/header";
import MainContent from "./components-skeleton/main-content";

function App() {
	return (
		<div
			className="
			flex flex-col
			justify-center items-center
			w-full min-h-screen"
		>
			<Header />
			<MainContent />
			<Footer />
		</div>
	);
}

export default App;
