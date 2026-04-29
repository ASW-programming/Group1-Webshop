import ProductCard from "./ProductCard";
import ScrollBanner from "./ScrollBanner.jsx";
import { useShop } from "../utils/context.jsx";
import { useSearchParams } from "react-router-dom";

function LandingComponent() {
    const { products, productsLoading, productsError } = useShop();
    const [searchParams] = useSearchParams();
    const input = searchParams.get("q")?.toLowerCase() ?? "";

    // Filtrerar produkter baserat på sökning
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
            {input && filteredProducts.length === 0 && (
                <p className="statusText">No products found</p>
            )}
            <ProductCard products={filteredProducts} />
        </div>
    );
}

export default LandingComponent;
