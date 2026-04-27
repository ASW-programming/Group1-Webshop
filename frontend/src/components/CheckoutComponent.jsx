import { useState } from "react";
import ItemButton from "./ItemButton";
import ItemInput from "./ItemInput";
import { postOrders } from "../utils/calls.js";
import { useShop } from "../utils/context.jsx";
import { useMutation } from "@tanstack/react-query";

function CheckoutComponent() {
	const [customer, setCustomer] = useState("");
	const { addedProducts, clearCart } = useShop();

	const { mutate, isPending } = useMutation({
		mutationFn: postOrders,
		onSuccess: () => {
			clearCart();
			setCustomer("");
			alert("Order Placed");
		},
		onError: (error) => {
			console.error("Something went wrong:", error);
		},
	});

	const placeOrders = async (e) => {
		e.preventDefault();

		if (!customer.trim()) return;

		const totalPrice = addedProducts.reduce((sum, item) => {
			return sum + item.price * item.quantity;
		}, 0);

		mutate({
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
				<ItemButton
					type="submit"
					text={isPending ? "Skickar..." : "Order"}
					disabled={isPending}
				/>
			</form>
		</div>
	);
}

export default CheckoutComponent;
