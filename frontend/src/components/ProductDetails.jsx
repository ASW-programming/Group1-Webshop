import { useParams } from "react-router-dom"
import { priceInfo } from "../utils/priceSetter.jsx";
import { getProducts } from "../utils/calls.js";
import { useQuery } from "@tanstack/react-query";
import ItemButton from "./ItemButton.jsx";
import { useState, useRef } from "react";

const ProductDetails = (props) => {

    const [localQuantity, setLocalQuantity] = useState({});
    const timerRef = useRef({});
    const pendingAmount = useRef({});


    // Show in real time number of added products and after 1 second send to shopping cart.
    const handleQuantityChange = (product, amount) => {
        // Instant feedback
        setLocalQuantity((prev) => {
            const newQty = (prev[product.id] ?? 0) + amount;
            if (newQty <= 0) {
                const updated = { ...prev };
                delete updated[product.id];
                return updated;
            }
            return { ...prev, [product.id]: newQty };
        });

        // Keep track of total amount of items
        pendingAmount.current[product.id] =
            (pendingAmount.current[product.id] ?? 0) + amount;

        // Clear timer
        clearTimeout(timerRef.current[product.id]);

        // New timer with new total
        timerRef.current[product.id] = setTimeout(() => {
            props.onAddProduct(product, pendingAmount.current[product.id]);
            // Reset after data send
            pendingAmount.current[product.id] = 0;
        }, 1000);
    };

    const { id } = useParams();

    // Fetch product details by ID
    const {
        data: selectedProduct = null,
        isLoading,
        isError,
    } = useQuery({ queryKey: ["selectedProduct", id], queryFn: () => getProducts(id) });

    if (isLoading) return <p>Loading product...</p>;
    if (isError) return <p>Something went wrong!</p>;

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