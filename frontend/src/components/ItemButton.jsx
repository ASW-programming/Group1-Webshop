function ItemButton() {
	return (
		<button
			className={props.className}
			id={props.id}
			type={props.type}
			onClick={props.onClick}>
			{props.text}
		</button>
	);
}

export default ItemButton;
