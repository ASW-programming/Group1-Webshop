import ProductCard from "./components/ProductCard";
import "./App.css";
import LandingComponent from "./components/LandingComponent";
import ProductDetails from "./components/ProductDetails";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";


function App() {
	return (
		<div>
			
			<Router>
				<Routes>
					<Route path="/" element={<LandingComponent />} />
					<Route path="/product/:id" element={<ProductDetails />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
