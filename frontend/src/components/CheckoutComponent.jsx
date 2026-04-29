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
} from "../assets/Icons";
import { Link } from "react-router-dom";

function CheckoutComponent() {
	const [customer, setCustomer] = useState("");
	const { addProduct, addedProducts = [], clearCart } = useShop();
	const [checkout, setCheckout] = useState(false);
	const [orderSuccess, setOrderSuccess] = useState(false);

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

		if (!customer.trim()) {
			alert("Write your name before going to payment");
			return;
		}

		mutate({ customer, items: addedProducts, price: totalPrice });
	};

	//When checkout is true show frindly message.
	if (checkout) {
		return (
			<div className="checkout-cart">
				<h2>Thank you for your order!</h2>
				<p>
					We will let you know when your order is ready for you to
					pick it up!
				</p>
				<ItemButton
					icon={<ReturnIcon />}
					onClick={() => window.history.back()}
				/>
			</div>
		);
	}

	return (
		<div className="cart-overview">
			<h2 className="cart-title">Your shopping cart</h2>

			{/* If addedProducts is empty, show the message, else show the list. Create a new HTML-element for each product in the list */}
			{addedProducts.length === 0 ? (
				<p className="cart-empty">Your shopping cart is empty</p>
			) : (
				<ul className="cart-list">
					{addedProducts.map((product) => (
						// "Key" is mandatory in React, helps to keep in track of which line is which one.
						<li key={product.id} className="cart-item">
							<div className="cart-item-info">
								<img
									src={product.imageUrl}
									alt={product.name}
									className="cart-item-image"
									style={{ height: "15px" }}
								/>
								<span className="cart-Item-name">
									{product.name}
								</span>
							</div>

							<div className="cart-item-price">
								<span className="cart-label-price">Price</span>
								<span>{`${product.price} kr`}</span>
							</div>

							<div className="cart-item-controls">
								<ItemButton
									icon={<RemoveIcon />}
									className="cart-btn-minus"
									onClick={() =>
										addProduct(product, -1)
									}></ItemButton>

								<span className="cart-item-quantity">
									{product.quantity}
								</span>

								<ItemButton
									icon={<AddIcon />}
									className="cart-btn-plus"
									onClick={() =>
										addProduct(product, 1)
									}></ItemButton>

								<ItemButton
									icon={<EmptyListIcon />}
									className="cart-btn-del-item"
									onClick={() =>
										addProduct(product, -product.quantity)
									}></ItemButton>
							</div>

							<div className="cart-item-total">
								<span className="cart-label-total">Total</span>

								{/* .toFixed(2) rounds to 2 decimal */}
								<span className="cart-total-price">
									{(product.price * product.quantity).toFixed(
										2,
									)}{" "}
									kr
								</span>
							</div>
						</li>
					))}
				</ul>
			)}

			<h2 className="cart-divider"></h2>
			<div className="cart-total-row">
				<span className="cart-total-cost">Total cost</span>
				<span className="cart-total-price-cost">
					{totalPrice.toFixed(2)} kr
				</span>
			</div>

			<div className="cart-actions">
				<ItemButton
					icon={<EmptyListIcon />}
					className="cart-delete-btn"
					onClick={() => clearCart()}
				/>
			</div>

			<div className="cart-name-section">
				<label htmlFor="cart-name-input" className="cart-name-label">
					Your name{" "}
				</label>

				<form onSubmit={placeOrders}>
					<ItemInput
						className="cart-name-input"
						id="cart-name-input"
						placeholder="Enter name..."
						onChange={(e) => setCustomer(e.target.value)}
						value={customer}></ItemInput>

					<ItemButton
						type="submit"
						text={isPending ? "Skickar..." : "Order"}
						disabled={isPending}
					/>
				</form>
				<ItemButton
					icon={<ReturnIcon />}
					onClick={() => window.history.back()}
				/>
				<Link to="/">
					<ItemButton icon={<HomeIcon />} />
				</Link>
			</div>
			<Link to="/orderHistory">
				<ItemButton text="Order historik" />
			</Link>
		</div>
	);
}

export default CheckoutComponent;
