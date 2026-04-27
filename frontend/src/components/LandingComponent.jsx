import ProductCard from "./ProductCard";
import ScrollBanner from "./ScrollBanner.jsx";
import { useShop } from "../utils/context.jsx";
import { useSearchParams } from "react-router-dom";

function LandingComponent() {
	const { products, productsLoading, productsError} = useShop();
	const [searchParams] = useSearchParams();
	const query = searchParams.get("q")?.toLowerCase() ?? "";

	const filteredProducts = query
		? products.filter(
			(p) =>
                p.name?.toLowerCase().includes(query) ||
                p.category?.toLowerCase().includes(query)
		)
	: products;

	// Slides
	const slidesData = products.map((u) => ({
		image: u.imageUrl,
		title: u.title,
		subtitle: u.description,
		buttonText: "View",
		onClick: () => console.log(u.id),
	}));

	if (productsLoading) return <p>Loading products...</p>;
	if (productsError) return <p>Something went wrong!</p>;

	return (
		<div className="content">
			<ScrollBanner slides={slidesData} />
			{query && filteredProducts.length === 0 && (
				<p className="statusText">No products found</p>
			)}
			<ProductCard products={filteredProducts}/>
		</div>
	);
}

export default LandingComponent;
