import ItemButton from "./ItemButton";
import { priceInfo } from "../utils/priceSetter.jsx";
import { Link } from "react-router-dom";
import { useShop } from "../utils/context.jsx";


function ProductCard({products}) { 
	const { localQuantity, handleQuantityChange} = useShop()

	
	return (
			
			<div className="productList">
				{products.map((u) => (
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
	);
}

export default ProductCard;
