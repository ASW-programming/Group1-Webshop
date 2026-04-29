import { useState, useEffect } from "react";
import ItemButton from "./ItemButton";
import ItemInput from "./ItemInput";
import { postOrders } from "../utils/calls.js";
import { useShop } from "../utils/context.jsx";
import { useMutation } from "@tanstack/react-query";
import {
	AddIcon,
	RemoveIcon,
	EmptyListIcon,
	ReturnIcon,
	HomeIcon,
	CancelIcon,
	AcceptIcon,
	ClearListIcon,
} from "../assets/Icons";
import { Link } from "react-router-dom";

function CheckoutComponent() {
	const [customer, setCustomer] = useState("");
	const { addProduct, addedProducts = [], clearCart } = useShop();
	const [checkout, setCheckout] = useState(false);
	const [orderSuccess, setOrderSuccess] = useState(false);
	const [error, setError] = useState("");

	const { mutate, isPending } = useMutation({
		mutationFn: postOrders,
		onSuccess: () => {
			setOrderSuccess(true);
		},
		onError: (error) => {
			console.error("Something went wrong:", error);
		},
	});

	useEffect(() => {
		if (orderSuccess) {
			clearCart();
			setCustomer("");
			setOrderSuccess(false);
			setCheckout(true);
		}
	}, [orderSuccess]);

	const totalPrice = addedProducts.reduce((sum, item) => {
		const price = item.reducedPrice || item.price;
		return sum + price * item.quantity;
	}, 0);

	const placeOrders = async (e) => {
		e.preventDefault();

		if (addedProducts.length === 0) {
			setError("Du har inte lagt till några produkter");
			return;
		}

		if (!customer.trim()) {
			setError("Skriv ditt namn innan betalning");
			return;
		}

		mutate({ customer, items: addedProducts, price: totalPrice });
	};

	//When checkout is true show frindly message.
	if (checkout) {
		return (
			<div className="checkout-cart">
				<h2>Tack för din beställning!</h2>
				<p>
					Vi meddelar dig när din beställning är klar för att hämtas!
				</p>
				<ItemButton
					title="Go back"
					icon={<ReturnIcon />}
					onClick={() => window.history.back()}
				/>
			</div>
		);
	}

	return (
		<div className="cart-overview">
			<h2 className="cart-title">Din kundvagn</h2>

			{/* If addedProducts is empty, show the message, else show the list. Create a new HTML-element for each product in the list */}
			{addedProducts.length === 0 ? (
				<p className="cart-empty">Din kundvagn är tom</p>
			) : (
				<table className="cartTable">
					<thead>
						<tr>
							<th>Produkt</th>
							<th>Pris</th>
							<th>Antal</th>
							<th>Totalt</th>
							<th></th>
						</tr>
					</thead>
					<tbody className="cartBody">
						{addedProducts.map((product) => (
							<tr key={product.id} className="cartItem">
								<td className="cart-item-info">
									<img
										src={product.imageUrl}
										alt={product.name}
										className="cart-item-image"
										style={{ height: "15px" }}
									/>
									<span className="cart-Item-name">
										{product.name}
									</span>
								</td>
								<td className="cart-item-price">
									<span className="cart-label-price">
										{`${product.reducedPrice ? product.reducedPrice : product.price} kr`}
									</span>
								</td>
								<td className="cartItemControls">
									<ItemButton
										title="Remove one product"
										icon={<RemoveIcon />}
										className="cart-btn-minus"
										onClick={() => addProduct(product, -1)}
									/>
									<span
										className="cartItemQuantity"
										onClick={() => {
											setEditQuantity("true");
											setQuantityID(product.id);
										}}>
										{`${product.quantity} st`}
									</span>
									<ItemButton
										title="Add one product"
										icon={<AddIcon />}
										className="cart-btn-plus"
										onClick={() => addProduct(product, 1)}
									/>
								</td>
								<td className="cart-item-total">
									<span className="cartTotalPrice">
										{`${(
											(product.reducedPrice
												? product.reducedPrice
												: product.price) *
											product.quantity
										).toFixed(2)} kr`}
									</span>
								</td>
								<td>
									<ItemButton
										title="Remove item"
										icon={<EmptyListIcon />}
										className="cart-btn-del-item"
										onClick={() =>
											addProduct(
												product,
												-product.quantity,
											)
										}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			{addedProducts.length > 0 && (
				<ItemButton
					title="Clear cart"
					icon={<ClearListIcon />}
					className="cartDeleteBtn"
					onClick={() => clearCart()}
				/>
			)}

			<h2 className="cart-divider"></h2>
			<div className="cart-total-row">
				<span className="cart-total-price-cost">
					{`Total kostnad: ${totalPrice.toFixed(2)}`} kr
				</span>
			</div>

			{error && <p className="error-message">{error}</p>}

			<div className="cart-name-section">
				<label htmlFor="cart-name-input" className="cart-name-label">
					Ditt namn{" "}
				</label>

				<form onSubmit={placeOrders}>
					<ItemInput
						className="cart-name-input"
						id="cart-name-input"
						placeholder="Enter name..."
						onChange={(e) => setCustomer(e.target.value)}
						value={customer}
					/>

					<ItemButton
						title="Place order"
						type="submit"
						text={isPending ? "Skickar..." : "Order"}
						disabled={isPending}
					/>
				</form>
				<div className="navigationBtns">
					<ItemButton
						title="Go back"
						icon={<ReturnIcon />}
						onClick={() => window.history.back()}
					/>
					<Link to="/">
						<ItemButton icon={<HomeIcon />} title="Homepage" />
					</Link>
				</div>
			</div>
			<Link to="/orderHistory" className="orderHistory">
				<ItemButton title="Order History" text="Order historik" />
			</Link>
		</div>
	);
}

export default CheckoutComponent;
