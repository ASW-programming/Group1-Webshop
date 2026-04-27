function ItemButton(props) {
	return (
		<button
			className={props.className}
			id={props.id}
			type={props.type}
			onClick={props.onClick}>
			{props.text || props.icon}
		</button>
	);
}

export default ItemButton;
