import ProductCard from "./ProductCard";
import ScrollBanner from "./ScrollBanner.jsx";
import { useShop } from "../utils/context.jsx";
import ItemButton from "./ItemButton.jsx";
import { Link } from "react-router-dom";

function LandingComponent() {
	const { products, productsLoading, productsError, activeCategory } =
		useShop();

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
			<Link to="/orderHistory">
				<ItemButton text="Order historik" />
			</Link>
			<ScrollBanner slides={slidesData} />
			<ProductCard products={products} activeCategory={activeCategory} />
		</div>
	);
}

export default LandingComponent;
