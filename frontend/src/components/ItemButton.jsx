const ItemButton = (prop) => {
	return (
		<div>
			<button
				className={prop.className}
				id={prop.id}
				type={prop.type}
				onClick={prop.onClick}>
				{prop.text}
			</button>
		</div>
	);
};

export default ItemButton;
