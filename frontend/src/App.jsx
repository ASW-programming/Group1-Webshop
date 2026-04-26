import ProductCard from "./components/ProductCard";
import "./App.css";
import LandingComponent from "./components/LandingComponent";
import ProductDetails from "./components/ProductDetails";
import ItemHeader from "./components/ItemHeader";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import { ShopProvider } from "./utils/context";


function App() {
	return (
		<div>
			<ShopProvider>
			<Router>
				<ItemHeader/>

				<Routes>
					<Route path="/" element={<LandingComponent />} />
					<Route path="/product/:id" element={<ProductDetails />} />
				</Routes>
			</Router>
			</ShopProvider>
		</div>
	);
}

export default App;
