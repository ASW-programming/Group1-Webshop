import { useState } from "react";
import ItemButton from "./ItemButton";

function ProductCard() {
	const [open, setOpen] = useState(false);
	const [productID, setProductID] = useState("");

	const products = [
		{
			id: 1,
			name: "Mackor",
			brand: "Garant",
			price: 49,
			description:
				"Mustigt rågbröd med surdeg. \nRikt på fibrer med 64% fullkorn. 340 gram. \nUrsprung Estland. \nIngredienser: rågmjöl och vetemjöl.",
			category: "Bröd",
			stock: 25,
			imageUrl:
				"https://assets.axfood.se/image/upload/f_auto,t_500/07340083463907_C1L1_s04",
		},
		{
			id: 2,
			name: "Gurka",
			brand: "Garant",
			price: 12,
			description:
				"Färsk gurka. Passar bra i salladen eller på smörgåsen.",
			category: "Grönsaker",
			stock: 25,
			imageUrl:
				"https://assets.axfood.se/image/upload/f_auto,t_500/07311042004691_C1N1_s01",
		},
		{
			id: 3,
			name: "Mjölk",
			brand: "Arla",
			price: 18,
			description: "Standardmjölk 3%. Svensk mjölk från Arlagårdar.",
			category: "Mejeri",
			stock: 40,
			imageUrl:
				"https://assets.axfood.se/image/upload/f_auto,t_500/07340083443893_C1L1_s06",
		},
		{
			id: 4,
			name: "Ägg 12-pack",
			brand: "Garant",
			price: 35,
			description: "Färska svenska ägg från frigående höns inomhus.",
			category: "Mejeri",
			stock: 30,
			imageUrl:
				"https://assets.axfood.se/image/upload/f_auto,t_500/07311043011742_C1L1_s01",
		},
		{
			id: 5,
			name: "Smör",
			brand: "Bregott",
			price: 52,
			description:
				"Normalsaltat smör. Perfekt till matlagning och smörgås.",
			category: "Mejeri",
			stock: 20,
			imageUrl:
				"https://assets.axfood.se/image/upload/f_auto,t_500/07311870010970_C1L1_s01",
		},
		{
			id: 6,
			name: "Kycklingfilé",
			brand: "Kronfågel",
			price: 89,
			description:
				"Svensk färsk kycklingfilé. Perfekt för stekning eller ugn.",
			category: "Kött",
			stock: 15,
			imageUrl:
				"https://assets.axfood.se/image/upload/f_auto,t_500/07340083434716_C1C1_s03",
		},
		{
			id: 7,
			name: "Pasta",
			brand: "Barilla",
			price: 22,
			description: "Spaghetti av hög kvalitet från Italien. 500 gram.",
			category: "Kolonial",
			stock: 50,
			imageUrl:
				"https://assets.axfood.se/image/upload/f_auto,t_200/07611612150729_C1N1_s03",
		},
		{
			id: 8,
			name: "Tomater",
			brand: "Garant",
			price: 25,
			description:
				"Söta körsbärstomater. Perfekta till sallad eller mellanmål.",
			category: "Grönsaker",
			stock: 35,
			imageUrl:
				"https://assets.axfood.se/image/upload/f_auto,t_200/07311042002215_C1N0_s01",
		},
		{
			id: 9,
			name: "Apelsinjuice",
			brand: "Tropicana",
			price: 30,
			description: "100% apelsinjuice utan tillsatt socker. 1 liter.",
			category: "Dryck",
			stock: 28,
			imageUrl:
				"https://assets.axfood.se/image/upload/f_auto,t_200/07340083456695_C1L1_s02",
		},
		{
			id: 10,
			name: "Kaffe",
			brand: "Zoégas",
			price: 65,
			description: "Mörkrostat bryggkaffe med fyllig smak. 450 gram.",
			category: "Dryck",
			stock: 18,
			imageUrl:
				"https://assets.axfood.se/image/upload/f_auto,t_200/07310731103011_C1R1_s01",
		},
	];

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
			<ItemButton text="Öppna" onClick={() => setOpen(true)} />
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
						<ItemButton text="+" />
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
