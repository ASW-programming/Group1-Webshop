import ProductCard from "./ProductCard";
import ScrollBanner from "./ScrollBanner.jsx";
import { useShop } from "../utils/context.jsx";
import ItemButton from "./ItemButton.jsx";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function LandingComponent() {
	const { products, productsLoading, productsError, activeCategory } =
		useShop();
	const [searchParams] = useSearchParams();
	const input = searchParams.get("q")?.toLowerCase() ?? "";
	const discountedProducts = products.filter((p) => p.reducedPrice);

	// Filters products based on search
	const filteredProducts = input
		? products.filter((p) => {
				const regex = new RegExp(
					`(^|[^a-zA-Z0-9åäöÅÄÖ])${input}([^a-zA-Z0-9åäöÅÄÖ]|$)`,
					"i",
				);
				return (
					regex.test(p.tags) ||
					regex.test(p.name) ||
					regex.test(p.category)
				);
			})
		: products;

	// Slides
	const slidesData = discountedProducts.map((u) => ({
		id: u.id,
		image: u.imageUrl,
		title: u.title,
		subtitle: u.description.slice(0, 100),
		price: u.reducedPrice,
		originalPrice: u.price,
		buttonText: "View",
	}));

	if (productsLoading) return <p>Loading products...</p>;
	if (productsError) return <p>Something went wrong!</p>;

	return (
		<div className="content">
			<ScrollBanner slides={slidesData} />
			{input && filteredProducts.length === 0 && (
				<p className="statusText">No products found</p>
			)}
			<ProductCard
				products={filteredProducts}
				activeCategory={activeCategory}
			/>

			<Link to="/orderHistory" className="orderHistory">
				<ItemButton title="Order History" text="Order historik" />
			</Link>
		</div>
	);
}

export default LandingComponent;
