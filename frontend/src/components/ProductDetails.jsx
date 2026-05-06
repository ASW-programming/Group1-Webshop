import { useParams } from "react-router-dom";
import { priceInfo } from "../utils/priceSetter.jsx";
import ItemButton from "./ItemButton.jsx";
import { useShop } from "../utils/context.jsx";
import { AddIcon, RemoveIcon, ReturnIcon } from "../assets/Icons.jsx";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
	const navigate = useNavigate();
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
	const selectedProduct = products.find((p) => String(p.id) === id);

	if (productsLoading) return <p>Loading product...</p>;
	if (productsError) return <p>Something went wrong!</p>;
	if (!selectedProduct) return <p>Product not found!</p>;

	const quantity = getProductQuantity(selectedProduct.id);

	return (
		<div className="productDetails">
			<div className="productInfo">
				<div className="productNameImg">
					<img
						className="productImage"
						src={selectedProduct.imageUrl}></img>
					<div className="productNameCategory">
						<p className="productName">{selectedProduct.name}</p>
						<p className="productCategory">
							{selectedProduct.category}
						</p>
						<p className="productPrice">
							{priceInfo(selectedProduct)}
						</p>
					</div>
				</div>

				<p className="productDescription">
					{selectedProduct.description || "Beskrivning saknas"}
				</p>
			</div>
			<div className="cardButtons productPageButtons">
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
							title="Add one product"
							icon={<AddIcon />}
							onClick={() =>
								handleQuantityChange(selectedProduct, 1)
							}
						/>
					</>
				) : (
					<ItemButton
						className="buyButton"
						title="Buy"
						text="Köp"
						onClick={() => {
							handleQuantityChange(selectedProduct, 1);
						}}
					/>
				)}
			</div>
			<ItemButton
				className="returnBtn"
				title="Go back"
				icon={<ReturnIcon />}
				onClick={() => navigate(-1)}
			/>
		</div>
	);
};

export default ProductDetails;
