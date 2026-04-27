import ItemButton from "./ItemButton";
import { useShop } from "../utils/context";
import {
	AddIcon,
	CancelIcon,
	EmptyListIcon,
	RemoveIcon,
	ShoppingCartIcon,
} from "../assets/Icons";

function ShoppingCart() {
	const {
		addedProducts,
		addProduct,
		displayQuantity,
		clearCart,
		isCartOpen,
		toggleCart,
		handleQuantityChange,
	} = useShop();

	const totalPrice =
		addedProducts
			?.map((product) => product.price * product.quantity)
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
								{product.name} {product.price}kr{"  "}
								Antal:{" "}
								<ItemButton
									icon={<RemoveIcon />}
									onClick={() => {
										handleQuantityChange(
											product,
											-1,
											false,
										);
									}}
								/>
								{displayQuantity[product.id] ??
									product.quantity}
								<ItemButton
									icon={<AddIcon />}
									onClick={() =>
										handleQuantityChange(product, 1, false)
									}
								/>
							</li>
						))}
					</ul>
					<h4>Total: {totalPrice}kr</h4>
					<ItemButton icon={<EmptyListIcon />} onClick={clearCart} />
				</div>
			)}
		</div>
	);
}

export default ShoppingCart;
