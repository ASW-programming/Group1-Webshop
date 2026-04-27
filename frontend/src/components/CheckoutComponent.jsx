import { useState } from "react";
import ItemButton from "./ItemButton";
import ItemInput from "./ItemInput";
import { postOrders } from "../utils/calls.js";
import { useQuery } from "@tanstack/react-query";
import { useShop } from "../utils/context.jsx";

function CheckoutComponent() {
	const [customer, setCustomer] = useState("");
	const { addedProducts, clearCart } = useShop();

	const placeOrders = async (e) => {
		e.preventDefault();

		if (!customer.trim()) return;

		const totalPrice = addedProducts.reduce((sum, item) => {
			return sum + item.price * item.quantity;
		}, 0);

		await postOrders({
			customer: customer,
			items: addedProducts,
			price: totalPrice,
		});

		clearCart();
		setCustomer("");
	};

	return (
		<div>
			<form onSubmit={placeOrders}>
				<ItemInput
					placeholder="Enter name..."
					onChange={(e) => setCustomer(e.target.value)}
					value={customer}
				/>
				<ItemButton type="submit" text="Order" />
			</form>
		</div>
	);
}

export default CheckoutComponent;
