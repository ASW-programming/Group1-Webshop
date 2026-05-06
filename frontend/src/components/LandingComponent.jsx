import ProductCard from "./ProductCard";
import ScrollBanner from "./ScrollBanner.jsx";
import { useShop } from "../utils/context.jsx";
import ItemButton from "./ItemButton.jsx";
import { Link, useSearchParams } from "react-router-dom";

function LandingComponent() {
	const { products, productsLoading, productsError, activeCategory } =
		useShop();
	const [searchParams, setSearchParams] = useSearchParams();
	const input = searchParams.get("q")?.toLowerCase() ?? "";
	const discountedProducts = products.filter((p) => p.reducedPrice);

	const filteredProducts = input
		? products.filter((p) => {
				const search = input.toLowerCase();

				const tags = Array.isArray(p.tags) ? p.tags : [];

				return (
					p.name?.toLowerCase().includes(search) ||
					tags.some((tag) => tag.toLowerCase() === search) ||
					p.category?.toLowerCase() === search
				);
			})
		: products;

	// Slides
	const slidesData = discountedProducts.map((u) => ({
		id: u.id,
		image: u.imageUrl,
		subtitle: u.shortDesc.slice(0, 100),
		price: u.reducedPrice,
		originalPrice: u.price,
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
