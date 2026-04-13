function ProductCard() {
	const testItem = {
		name: "Mackor",
		brand: "Garant",
		price: 49,
		description:
			"Mustigt rågbröd med surdeg. \nRikt på fibrer med 64% fullkorn. 340 gram. \nUrsprung Estland. \nIngredienser: rågmjöl och vetemjöl.",
		category: "Bröd",
		stock: 25,
		imageUrl:
			"https://assets.axfood.se/image/upload/f_auto,t_500/07340083463907_C1L1_s04",
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				border: "solid black 1px",
			}}>
			<img
				src={testItem.imageUrl}
				alt=""
				style={{ width: "100px", height: "100px" }}
			/>
			<span style={{ fontWeight: "bold" }}>{testItem.name}</span>
			<span style={{ textDecoration: "bold" }}>{testItem.brand}</span>
			<span style={{ whiteSpace: "pre-line" }}>
				{testItem.description.slice(0, 29)}
			</span>
			<span>{`${testItem.price} kr`}</span>
		</div>
	);
}

export default ProductCard;
