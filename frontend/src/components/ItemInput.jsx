function ItemInput(props) {
    return (
        <input
            className={props.className}
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={props.onChange}
        />
    )
}

export default ItemInput