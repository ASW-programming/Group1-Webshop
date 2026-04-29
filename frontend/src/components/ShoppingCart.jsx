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
				className="shoppingcartBtn"
				icon={isCartOpen ? <CancelIcon /> : <ShoppingCartIcon />}
			/>
			{isCartOpen && (
				<div className="shoppingList">
					<h4 className="shoppingListTitle">Valda produkter</h4>
					<ul className="shoppingListItems">
						{addedProducts?.map((product) => (
							<li key={product.id}>
								<img
									src={product.imageUrl}
									style={{ width: "15px", height: "15px" }}
								/>{" "}
								{product.name} {product.price}kr{"  "}
								<div className="quantityControls">
                                Antal:{" "}
								<ItemButton
                                    className="removeButton"
									icon={<RemoveIcon />}
									onClick={() => {
										handleQuantityChange(product, -1); 
									}}></ItemButton>
								{getProductQuantity(product.id)}
								<ItemButton
                                    className="addButton"
									icon={<AddIcon />}
									onClick={() =>
										handleQuantityChange(product, 1)
									}></ItemButton>
                                    </div>
							</li>
						))}
					</ul>
					<h4>Total: {totalPrice}kr</h4>
					<ItemButton className="clearButton" icon={<EmptyListIcon />} onClick={clearCart} />
				</div>
			)}
		</div>
	);
}

export default ShoppingCart;
