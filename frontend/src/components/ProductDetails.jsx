import { useParams } from "react-router-dom";
import { priceInfo } from "../utils/priceSetter.jsx";
import ItemButton from "./ItemButton.jsx";
import { useShop } from "../utils/context.jsx";
import { AddIcon, RemoveIcon, ReturnIcon } from "../assets/Icons.jsx";

const ProductDetails = () => {
	const {
		addedProducts,
		handleQuantityChange,
		products,
		productsLoading,
		productsError,
		getProductQuantity,
	} = useShop();

	const { id } = useParams();

	// Fetch product details by ID
	const selectedProduct = products.find((p) => p.id === id);

	if (productsLoading) return <p>Loading product...</p>;
	if (productsError) return <p>Something went wrong!</p>;
	if (!selectedProduct) return <p>Product not found!</p>;

	const quantity = getProductQuantity(selectedProduct.id);

	return (
		<div className="productDetails">
			<ItemButton
				title="Go back"
				icon={<ReturnIcon />}
				onClick={() => window.history.back()}
			/>
			<div className="productInfo">
				<img
					className="productImage"
					src={selectedProduct.imageUrl}></img>
				<div className="productNameCategory">
					<span className="productName">{selectedProduct.name}</span>
					<span className="productCategory">
						{selectedProduct.category}
					</span>
				</div>
				<span className="productPrice">
					{priceInfo(selectedProduct)}
				</span>
				<span className="productDescription">
					{selectedProduct.description}
				</span>
			</div>
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
								handleQuantityChange(selectedProduct, -1);
							}}
						/>

						<p>{quantity}</p>
						<ItemButton
							title="Add one banner"
							icon={<AddIcon />}
							onClick={() =>
								handleQuantityChange(selectedProduct, 1)
							}
						/>
					</>
				) : (
					<ItemButton
						title="Buy"
						text="Köp"
						onClick={() => {
							handleQuantityChange(selectedProduct, 1);
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default ProductDetails;
