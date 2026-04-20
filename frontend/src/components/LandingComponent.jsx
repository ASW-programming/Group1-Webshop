import ItemHeader from "./ItemHeader.jsx";
import ProductCard from "./ProductCard";
import { getProducts } from "../utils/calls.js";
import { useQuery } from "@tanstack/react-query";

function LandingComponent() {
	// Fetches products from DB.
	const {
		// Defines products as an empty array.
		data: products = [],
		isLoading,
		isError,
	} = useQuery({ queryKey: ["products"], queryFn: getProducts });

	// Maps out categories. Removes duplicates and converts back into array.
	const categories = [...new Set(products.map((p) => p.category))];

	if (isLoading) return <p>Loading products...</p>;
	if (isError) return <p>Something went wrong!</p>;

	console.log(products);

	return (
		<div>
			<ItemHeader
				categories={categories}
				onCategorySelect={(category) => console.log(category)}
			/>
			<ProductCard products={products} />
		</div>
	);
}

export default LandingComponent;
