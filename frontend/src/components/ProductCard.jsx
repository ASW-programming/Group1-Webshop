import { useState, useRef } from "react";
import ItemButton from "./ItemButton";
import { getProducts } from "../utils/calls.js";
import { useQuery } from "@tanstack/react-query";

function ProductCard(props) {
	const [open, setOpen] = useState(false);
	const [productID, setProductID] = useState("");
	const [localQuantity, setLocalQuantity] = useState({});
	const timerRef = useRef({});
	const pendingAmount = useRef({});

	// Searches for where id from object is the same as id from useState
	const selectedProduct = props.products.find((u) => u.id === productID);

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
		<div>
			<div className="productList">
				{props.products.map((u) => (
					<li
						key={u.id}
						className="productListElement"
						onClick={() => {
							setOpen(true);
							setProductID(u.id);
						}}>
						<div className="productInformation">
							<img
								className="productImage"
								src={u.imageUrl}></img>
							<span className="productName">{u.name}</span>
							<span className="productCategory">
								{u.category}
							</span>
							<span className="productPrice">{`${u.price} kr`}</span>
							<span className="productDescription">
								{u.description.slice(0, 30)}
							</span>
						</div>
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

			{open && selectedProduct && (
				<div className="productOverlay" onClick={() => setOpen(false)}>
					{/* If you press inside the square it does not close */}
					<div
						className="productModal"
						onClick={(e) => e.stopPropagation()}>
						<div className="productExpanded">
							<img
								className="productImage"
								src={selectedProduct.imageUrl}></img>
							<div className="productNameCategory">
								<span className="productName">
									{selectedProduct.name}
								</span>
								<span className="productCategory">
									{selectedProduct.category}
								</span>
							</div>
							<span className="productPrice">{`${selectedProduct.price} kr`}</span>
							<span className="productDescription">
								{selectedProduct.description}
							</span>
						</div>

						<ItemButton
							text="Close"
							onClick={() => setOpen(false)}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default ProductCard;
