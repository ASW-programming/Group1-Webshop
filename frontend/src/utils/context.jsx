import { createContext, useContext, useState, useEffect, useRef } from "react";
import { getProducts } from "./calls.js";
import { useQuery } from "@tanstack/react-query";

const ShopContext = createContext();

export function ShopProvider({ children }) {
	// ===== PRODUCT DATA =====
	const {
		data: products = [],
		isLoading: productsLoading,
		isError: productsError,
	} = useQuery({
		queryKey: ["products"],
		queryFn: getProducts,
	});

	// Maps out categories. Removes duplicates and converts back into array.
	const categories = [...new Set(products.map((p) => p.category))];

	// ===== CART FUNCTIONALITY =====

	const [displayQuantity, setDisplayQuantity] = useState({});

	const [addedProducts, setAddedProducts] = useState(() => {
		const saved = localStorage.getItem("shoppingCart");
		return saved ? JSON.parse(saved) : [];
	});

	const addProduct = (product, amount = 1) => {
		setDisplayQuantity((prev) => {
			const newQty = (prev[product.id] ?? 0) + amount;
			if (newQty <= 0) {
				const updated = { ...prev };
				delete updated[product.id];
				return updated;
			}
			return { ...prev, [product.id]: newQty };
		});
		setAddedProducts((prev) => {
			const exists = prev.find((p) => p.id === product.id);
			const newQuantity = (exists?.quantity ?? 0) + amount;

			if (newQuantity <= 0)
				return prev.filter((p) => p.id !== product.id);
			if (exists)
				return prev.map((p) =>
					p.id === product.id ? { ...p, quantity: newQuantity } : p,
				);
			return [...prev, { ...product, quantity: newQuantity }];
		});
	};

	const clearCart = () => {
		setAddedProducts([]);
		setDisplayQuantity({});
		localStorage.removeItem("shoppingCart");
	};

	useEffect(() => {
		localStorage.setItem("shoppingCart", JSON.stringify(addedProducts));
	}, [addedProducts]);

	// ===== PRODUCTCARD AND PRODUCTDETAIL Functionality =====

	const [localQuantity, setLocalQuantity] = useState({});

	// Show in real time number of added products and send to shopping cart
	const handleQuantityChange = (product, amount) => {
		// Instant feedback
		setLocalQuantity((prev) => {
			const newQty = (prev[product.id] ?? 0) + amount;
			if (newQty <= 0) {
				const updated = { ...prev };
				delete updated[product.id];
				return updated;
			}
			return { ...prev, [product.id]: newQty };
		});

		addProduct(product, amount);
	};

	const getProductQuantity = (productId) => {
		const found = addedProducts.find((p) => p.id === productId);
		return found ? found.quantity : 0;
	};
	//===== HAMBURGERMENU =====

	const [activeCategory, setActiveCategory] = useState(null);

	const selectCategory = (category) => {
		setActiveCategory((prev) => (prev === category ? null : category)); // klicka igen = avmarkera
	};

	const value = {
		// product data
		products,
		productsLoading,
		productsError,
		categories,
		// cart functionality
		displayQuantity,
		addedProducts,
		addProduct,
		clearCart,
		getProductQuantity,
		// Local state for quantity changes
		localQuantity,
		handleQuantityChange,
		//HamburgerMenu
		activeCategory,
		selectCategory,
	};

	return (
		<ShopContext.Provider value={value}>{children}</ShopContext.Provider>
	);
}

export const useShop = () => useContext(ShopContext);
