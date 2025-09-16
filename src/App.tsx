import Footer from "./components/core/footer";
import Header from "./components/core/header";
import Main from "./components/core/main";

function App() {
	return (
		<div
			className="
			flex flex-col
			justify-center items-center
			w-full h-screen"
		>
			<Header />
			<Main />
			<Footer />
		</div>
	);
}

export default App;
