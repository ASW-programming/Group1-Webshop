import ItemButton from "./ItemButton";
import { useShop } from "../utils/context";
import {
	AddIcon,
	CancelIcon,
	EmptyListIcon,
	RemoveIcon,
	ShoppingCartIcon,
	ClearListIcon,
} from "../assets/Icons";
import { useState, useEffect } from "react";
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
				title={isCartOpen ? "Close Menu" : "Open Cart"}
				onClick={toggleCart}
				className="shoppingcart-btn"
				icon={isCartOpen ? <CancelIcon /> : <ShoppingCartIcon />}
			/>
			{isCartOpen && (
				<div className="shopping-list">
					<table className="productTable">
						<tbody>
							{addedProducts?.map((product) => (
								<tr key={product.id}>
									<td>
										<img
											src={product.imageUrl}
											style={{
												width: "15px",
												height: "15px",
											}}
										/>
									</td>
									<td>{product.name}</td>
									<td>
										{product.reducedPrice
											? product.reducedPrice
											: product.price}{" "}
										kr
									</td>
									<td>
										<ItemButton
											title="Remove on product"
											icon={<RemoveIcon />}
											onClick={() =>
												handleQuantityChange(
													product,
													-1,
												)
											}
										/>
										{getProductQuantity(product.id)}
										<ItemButton
											title="Add one product"
											icon={<AddIcon />}
											onClick={() =>
												handleQuantityChange(product, 1)
											}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<h4>Total: {totalPrice}kr</h4>
					<ItemButton
						icon={<ClearListIcon />}
						className="cartDeleteBtn"
						onClick={() => clearCart()}
						title="Clear cart"
					/>

					<Link to="/checkout">
						<ItemButton text="Checkout" />
					</Link>
				</div>
			)}
		</div>
	);
}

export default ShoppingCart;
