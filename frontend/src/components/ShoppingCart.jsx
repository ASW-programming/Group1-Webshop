import ItemButton from "./ItemButton";
import { useShop } from "../utils/context";
import { useState } from "react";

function ShoppingCart() {
    const {addedProducts, getProductQuantity, clearCart, handleQuantityChange} = useShop();

    const [isCartOpen, setIsCartOpen] = useState(false);
        const toggleCart = () => setIsCartOpen(!isCartOpen);

	const totalPrice =
		addedProducts
			?.map((product) => product.price * product.quantity)
			.reduce((sum, productTotal) => sum + productTotal, 0) || 0;

	return (
		<div>
			<ItemButton
				onClick={toggleCart}
				className="shoppingcart-btn"
				text={isCartOpen ? "x" : "🛒"}
			/>
			{isCartOpen && (
				<div className="shopping-list">
					<ul>
						{addedProducts?.map((product) => (
							<li key={product.id}>
								<img
									src={product.imageUrl}
									style={{ width: "15px", height: "15px" }}
								/>{" "}
								{product.name} {product.price}kr{"  "}
								Antal:{" "}
								<ItemButton
									text="-"
									onClick={() => {
										handleQuantityChange(product, -1); 
									}}></ItemButton>
								{getProductQuantity(product.id)}
								<ItemButton
									text="+"
									onClick={() =>
										handleQuantityChange(product, 1)
									}></ItemButton>
							</li>
						))}
					</ul>
					<h4>Total: {totalPrice}kr</h4>
					<ItemButton text="Empty basket" onClick={clearCart} />
				</div>
			)}
		</div>
	);
}

export default ShoppingCart;
