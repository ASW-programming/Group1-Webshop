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

	const selectedProduct = products.find((u) => u.id === productID);

	const styles = {
		overlay: {
			position: "fixed",
			inset: 0,
			background: "rgba(0,0,0,0.5)",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			zIndex: 1000,
		},
		modal: {
			background: "white",
			padding: "2rem",
			borderRadius: "8px",
			minWidth: "300px",
		},
	};

	return (
		<div>
			<div
				style={{
					display: "flex",
					gap: "10px",
					flexWrap: "wrap",
					width: "75%",
				}}>
				{products.map((u) => (
					<li
						key={u.id}
						style={{ border: "solid black 1px" }}
						onClick={() => {
							setOpen(true);
							setProductID(u.id);
						}}>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								maxWidth: "150px",
							}}>
							<img
								src={u.imageUrl}
								style={{
									width: "100px",
									height: "100px",
								}}></img>
							<span style={{ fontWeight: "bold" }}>{u.name}</span>
							<span>{u.category}</span>
							<span>{`${u.price} kr`}</span>
							<span style={{ whiteSpace: "pre-line" }}>
								{u.description.slice(0, 30)}
							</span>
						</div>
					</li>
				))}
			</div>

			{open && selectedProduct && (
				<div style={styles.overlay} onClick={() => setOpen(false)}>
					{/* Om man trycker i rutan så stängs inte fönstret */}
					<div
						style={styles.modal}
						onClick={(e) => e.stopPropagation()}>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
							}}>
							<img
								src={selectedProduct.imageUrl}
								style={{
									width: "100px",
									height: "100px",
								}}></img>
							<span style={{ fontWeight: "bold" }}>
								{selectedProduct.name}
							</span>
							<span>{selectedProduct.category}</span>
							<span>{`${selectedProduct.price} kr`}</span>
							<span style={{ whiteSpace: "pre-line" }}>
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
