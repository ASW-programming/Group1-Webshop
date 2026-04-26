import { useParams } from "react-router-dom"
import { priceInfo } from "../utils/priceSetter.jsx";
import ItemButton from "./ItemButton.jsx";
import { useShop } from "../utils/context.jsx";

const ProductDetails = () => {
    const { localQuantity, handleQuantityChange, products, productsLoading, productsError } = useShop();

    const { id } = useParams();

    // Fetch product details by ID
    const selectedProduct = products.find(p => p.id === id);

    if (productsLoading) return <p>Loading product...</p>;
    if (productsError) return <p>Something went wrong!</p>;
    if (!selectedProduct) return <p>Product not found!</p>;

    return (
        <div
            className="productDetails">
            <ItemButton
                text="Tillbaka"
                onClick={() => window.history.back()}
            />
            <div className="productInfo">
                <img
                    className="productImage"
                    src={selectedProduct.imageUrl}></img>
                <div className="productNameCategory">
                    <span className="productName">
                        {selectedProduct.name}
                    </span>
                    <span className="productCategory">
                        {selectedProduct.category}
                    </span>
                </div>
                <span className="productPrice">{priceInfo(selectedProduct)}</span>
                <span className="productDescription">
                    {selectedProduct.description}
                </span>
            </div>

            <ItemButton
                text="Add to cart"
                onClick={() => handleQuantityChange(selectedProduct, 1)}
            />
            <div
                className="cartButtons"
                onClick={(e) => {
                    e.stopPropagation();
                }}>
                <ItemButton
                    text="-"
                    onClick={() => handleQuantityChange(selectedProduct, -1)}
                />
                <p>{localQuantity[selectedProduct.id] ?? 0}</p>
                <ItemButton
                    text="+"
                    onClick={() => handleQuantityChange(selectedProduct, 1)}
                />
            </div>

        </div>

    )
}


export default ProductDetails;