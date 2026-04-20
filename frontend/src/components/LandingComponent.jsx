import { getProducts } from "../utils/calls.js";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import ItemHeader from "./ItemHeader.jsx";
import ProductCard from "./ProductCard";
import ScrollBanner from "./ScrollBanner.jsx";

function LandingComponent() {
	const [displayQuantity, setDisplayQuantity] = useState({});

	const [addedProducts, setAddedProducts] = useState(() => {
		const saved = localStorage.getItem("shoppingCart");
		return saved ? JSON.parse(saved) : [];
	});

	// Fetches products from DB.
	const {
		// Defines products as an empty array.
		data: products = [],
		isLoading,
		isError,
	} = useQuery({ queryKey: ["products"], queryFn: getProducts });

	// Maps out categories. Removes duplicates and converts back into array.
	const categories = [...new Set(products.map((p) => p.category))];

	useEffect(() => {
		localStorage.setItem("shoppingCart", JSON.stringify(addedProducts));
	}, [addedProducts]);

	// Shopping items
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

	// Slides
	const slidesData = products.map((u) => ({
		image: u.imageUrl,
		title: u.title,
		subtitle: u.description,
		buttonText: "View",
		onClick: () => console.log(u.id),
	}));

	if (isLoading) return <p>Loading products...</p>;
	if (isError) return <p>Something went wrong!</p>;

	return (
		<div className="content">
			<ItemHeader
				categories={categories}
				onCategorySelect={(category) => console.log(category)}
				addedProducts={addedProducts}
				onAddProduct={addProduct}
				displayQuantity={displayQuantity}
				onClearCart={clearCart}
			/>
			<ScrollBanner slides={slidesData} />
			<ProductCard
				products={products}
				onAddProduct={addProduct}
				addedProducts={addedProducts}
				displayQuantity={displayQuantity}
				setDisplayQuantity={setDisplayQuantity}
			/>
		</div>
	);
}

export default LandingComponent;
