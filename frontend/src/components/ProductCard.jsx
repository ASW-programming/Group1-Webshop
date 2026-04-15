import { useState } from "react";
import ItemButton from "./ItemButton";
import { getProducts } from "../utils/calls.js";
import { useQuery } from "@tanstack/react-query";

function ProductCard() {
	const [open, setOpen] = useState(false);
	const [productID, setProductID] = useState("");

	const {
		data: products,
		isLoading,
		isError,
	} = useQuery({ queryKey: ["products"], queryFn: getProducts });

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
