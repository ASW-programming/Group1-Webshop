import { useState, useRef } from "react";
import ItemButton from "./ItemButton";
import { getProducts } from "../utils/calls.js";
import { useQuery } from "@tanstack/react-query";
import { priceInfo } from "../utils/priceSetter.jsx";
import { Link } from "react-router-dom";


function ProductCard(props) {
	const [productID, setProductID] = useState("");
	const [localQuantity, setLocalQuantity] = useState({});
	const timerRef = useRef({});
	const pendingAmount = useRef({});


	// Show in real time number of added products and after 1 second send to shopping cart.
	const handleQuantityChange = (product, amount) => {
		// Instant feedback
		setLocalQuantity((prev) => {
			const newQty = (prev[product.id] ?? 0) + amount;
			if (newQty <= 0) {
				const updated = { ...prev };
				delete updated[product.id];
				return updated;
			}
			return { ...prev, [product.id]: newQty };
		});

		// Keep track of total amount of items
		pendingAmount.current[product.id] =
			(pendingAmount.current[product.id] ?? 0) + amount;

		// Clear timer
		clearTimeout(timerRef.current[product.id]);

		// New timer with new total
		timerRef.current[product.id] = setTimeout(() => {
			props.onAddProduct(product, pendingAmount.current[product.id]);
			// Reset after data send
			pendingAmount.current[product.id] = 0;
		}, 1000);
	};


	
	return (
			
			<div className="productList">
				{props.products.map((u) => (
					<li
						key={u.id}
						className="productListElement"
						>
						<Link to={`/product/${u.id}`}>
						<div className="productInformation">
							<img
								className="productImage"
								src={u.imageUrl}></img>
							<span className="productName">{u.name}</span>
							<span className="productCategory">
								{u.category}
							</span>
							<span className="productPrice">{priceInfo(u)}</span>
							<span className="productDescription">
								{u.description.slice(0, 30)}
							</span>
						</div>
						</Link>
						<div
							className="cartButtons"
							onClick={(e) => {
								e.stopPropagation();
							}}>
							<ItemButton
								text="-"
								onClick={() => handleQuantityChange(u, -1)}
							/>
							<p>{localQuantity[u.id] ?? 0}</p>
							<ItemButton
								text="+"
								onClick={() => handleQuantityChange(u, 1)}
							/>
						</div>
					</li>
				))}
			</div>
			
	)}

export default ProductCard;
