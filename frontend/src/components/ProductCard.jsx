import { useState, useEffect } from "react";
import ItemButton from "./ItemButton";
import { getProducts } from "../utils/calls.js";
import { useQuery } from "@tanstack/react-query";

function ProductCard() {
	const [open, setOpen] = useState(false);
	const [productID, setProductID] = useState("");
	const [addToCart, setAddToCart] = useState([]);
	const [displayQuantity, setDisplayQuantity] = useState({});

	const {
		data: products,
		isLoading,
		isError,
	} = useQuery({ queryKey: ["products"], queryFn: getProducts });

	useEffect(() => {
		console.log(addToCart);
	}, [addToCart]);

	const updateQuantity = (product, amount) => {
		setDisplayQuantity((prev) => {
			const newQty = (prev[product.id] ?? 0) + amount;
			return { ...prev, [product.id]: Math.max(0, newQty) };
		});

		setTimeout(() => {
			setAddToCart((prev) => {
				const existingProduct = prev.find((p) => p.id === product.id);
				const newQuantity = (existingProduct?.quantity ?? 0) + amount;

				if (newQuantity <= 0) {
					return prev.filter((p) => p.id !== product.id);
				} else if (existingProduct) {
					return prev.map((p) =>
						p.id === product.id
							? { ...p, quantity: newQuantity }
							: p,
					);
				} else {
					return [...prev, { ...product, quantity: newQuantity }];
				}
			});
		}, 1000);
	};

	if (isLoading) return <p>Loading products...</p>;
	if (isError) return <p>Something went wrong!</p>;

	// Searches for where id from object is the same as id from useState
	const selectedProduct = products.find((u) => u.id === productID);

	return (
		<div>
			<div className="productList">
				{products.map((u) => (
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
						<div className="cartButtons">
							<ItemButton
								text="-"
								onClick={(e) => {
									e.stopPropagation();
									updateQuantity(u, -1);
								}}
							/>
							<p>{displayQuantity[u.id] ?? 0}</p>
							<ItemButton
								text="+"
								onClick={(e) => {
									e.stopPropagation();
									updateQuantity(u, +1);
								}}
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
