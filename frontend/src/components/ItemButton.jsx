function ItemButton(props) {
	return (
		<button
			title={props.title}
			className={props.className}
			id={props.id}
			type={props.type}
			onClick={props.onClick}>
			{props.icon}
			{props.text}
		</button>
	);
}

export default ItemButton;
