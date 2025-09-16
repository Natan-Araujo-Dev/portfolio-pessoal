import Footer from "./components/skeleton/footer";
import Header from "./components/skeleton/header";
import Main from "./components/skeleton/main";

function App() {
	return (
		<div
			className="
			flex flex-col
			justify-center items-center
			w-full min-h-screen"
		>
			<Header />
			<Main />
			<Footer />
		</div>
	);
}

export default App;
