import ItemButton from "./ItemButton";
import { useShop } from "../utils/context";
import {
	AddIcon,
	CancelIcon,
	EmptyListIcon,
	RemoveIcon,
	ShoppingCartIcon,
} from "../assets/Icons";
import { useState } from "react";
import { Link } from "react-router-dom";

function ShoppingCart() {
	const {
		addedProducts,
		getProductQuantity,
		clearCart,
		handleQuantityChange,
	} = useShop();

	const [isCartOpen, setIsCartOpen] = useState(false);
	const toggleCart = () => setIsCartOpen(!isCartOpen);

	const totalPrice =
		addedProducts
			?.map((product) => {
				const price = product.reducedPrice || product.price;
				return price * product.quantity;
			})
			.reduce((sum, productTotal) => sum + productTotal, 0) || 0;

	return (
		<div>
			<ItemButton
				onClick={toggleCart}
				className="shoppingcart-btn"
				icon={isCartOpen ? <CancelIcon /> : <ShoppingCartIcon />}
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
								{product.name}{" "}
								{product.reducedPrice
									? product.reducedPrice
									: product.price}
								kr{"  "}
								Antal:{" "}
								<ItemButton
									icon={<RemoveIcon />}
									onClick={() => {
										handleQuantityChange(product, -1);
									}}></ItemButton>
								{getProductQuantity(product.id)}
								<ItemButton
									icon={<AddIcon />}
									onClick={() =>
										handleQuantityChange(product, 1)
									}></ItemButton>
							</li>
						))}
					</ul>
					<h4>Total: {totalPrice}kr</h4>
					<ItemButton icon={<EmptyListIcon />} onClick={clearCart} />
					<Link to="/checkout">
						<ItemButton text="Checkout" />
					</Link>
				</div>
			)}
		</div>
	);
}

export default ShoppingCart;
