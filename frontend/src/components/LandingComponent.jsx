import ProductCard from "./ProductCard";
import ScrollBanner from "./ScrollBanner.jsx";
import { useShop } from "../utils/context.jsx";

function LandingComponent() {
	const { products, productsLoading, productsError, activeCategory } =
		useShop();

	// Slides
	const slidesData = products.map((u) => ({
		image: u.imageUrl,
		title: u.name,
		subtitle: u.description.slice(0, 100),
		buttonText: "View",
		onClick: () => console.log(u.id),
	}));

	if (productsLoading) return <p>Loading products...</p>;
	if (productsError) return <p>Something went wrong!</p>;

	return (
		<div className="content">
			<ScrollBanner slides={slidesData} />
			<ProductCard products={products} activeCategory={activeCategory} />
		</div>
	);
}

export default LandingComponent;
