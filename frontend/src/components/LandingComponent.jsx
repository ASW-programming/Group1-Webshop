import ProductCard from "./ProductCard";
import ScrollBanner from "./ScrollBanner.jsx";
import { useShop } from "../utils/context.jsx";

function LandingComponent() {
	const { products, productsLoading, productsError, activeCategory } =
		useShop();

	const discountedProducts = products.filter((p) => p.reducedPrice)

	// Slides
	const slidesData = discountedProducts.map((u) => ({
		id: u.id,
		image: u.imageUrl,
		title: u.name,
		subtitle: u.description,
		price: u.reducedPrice,
		originalPrice: u.price,
		buttonText: "View",
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
