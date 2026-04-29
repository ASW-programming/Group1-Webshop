import ProductCard from "./components/ProductCard";
import "./App.css";
import LandingComponent from "./components/LandingComponent";
import ProductDetails from "./components/ProductDetails";
import ItemHeader from "./components/ItemHeader";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ShopProvider } from "./utils/context";
import CheckoutComponent from "./components/CheckoutComponent";
import OrderHistory from "./components/OrderHistory";

function App() {
	return (
		<div>
			<ShopProvider>
				<Router>
					<ItemHeader />

					<Routes>
						<Route path="/" element={<LandingComponent />} />
						<Route
							path="/product/:id"
							element={<ProductDetails />}
						/>
						<Route
							path="/orderHistory"
							element={<OrderHistory />}
						/>
						<Route
							path="/checkout"
							element={<CheckoutComponent />}
						/>
					</Routes>
				</Router>
			</ShopProvider>
		</div>
	);
}

export default App;
