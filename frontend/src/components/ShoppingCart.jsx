import { useState, useEffect } from "react";
import ItemButton from "./ItemButton";

function ShoppingCart({
	addedProducts,
	onAddProduct,
	displayQuantity,
	onClearCart,
}) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const totalPrice =
		addedProducts
			?.map((product) => product.price * product.quantity)
			.reduce((sum, productTotal) => sum + productTotal, 0) || 0;

	return (
		<div>
			<ItemButton
				onClick={toggleMenu}
				className="shoppingcart-btn"
				text={isOpen ? "x" : "🛒"}
			/>
			{isOpen && (
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
										onAddProduct(product, -1);
									}}></ItemButton>
								{displayQuantity[product.id] ??
									product.quantity}
								<ItemButton
									text="+"
									onClick={() =>
										onAddProduct(product, 1)
									}></ItemButton>
							</li>
						))}
					</ul>
					<h4>Total: {totalPrice}kr</h4>
					<ItemButton text="Empty basket" onClick={onClearCart} />
				</div>
			)}
		</div>
	);
}

export default ShoppingCart;
