import ItemButton from "./ItemButton";
import { priceInfo } from "../utils/priceSetter.jsx";
import { Link } from "react-router-dom";
import { useShop } from "../utils/context.jsx";
import { AddIcon, RemoveIcon } from "../assets/Icons.jsx";
import { useState, useEffect } from "react";

function ProductCard({ products, activeCategory }) {
	const { handleQuantityChange, getProductQuantity } = useShop();

	const filteredProducts = products.filter(
		(u) => !activeCategory || u.category === activeCategory,
	);

	return (
		<div className="productList">
			{filteredProducts.map((u) => {
				const quantity = getProductQuantity(u.id);
				return (
					<li key={u.id} className="productListElement">
						<Link to={`/product/${u.id}`}>
							<div className="productInformation">
								<img
									className="productImage"
									src={u.imageUrl}></img>
								<span className="productName">{u.name}</span>
								<span className="productCategory">
									{u.category}
								</span>
								<span className="productPrice">
									{priceInfo(u)}
								</span>
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
							{quantity > 0 ? (
								<>
									<ItemButton
										title="Remove one product"
										icon={<RemoveIcon />}
										onClick={() => {
											handleQuantityChange(u, -1);
										}}
									/>

									<p>{quantity}</p>
									<ItemButton
										title="Add one product"
										icon={<AddIcon />}
										onClick={() =>
											handleQuantityChange(u, 1)
										}
									/>
								</>
							) : (
								<ItemButton
									title="Buy"
									text="Köp"
									onClick={() => {
										handleQuantityChange(u, 1);
									}}
								/>
							)}
						</div>
					</li>
				);
			})}
		</div>
	);
}

export default ProductCard;
