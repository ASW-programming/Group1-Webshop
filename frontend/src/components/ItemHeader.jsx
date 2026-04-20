import ItemButton from "./ItemButton";
import ItemInput from "./ItemInput";
import HamburgerMenu from "./HamburgerMenu";
import ShoppingCart from "./ShoppingCart";

function ItemHeader(props) {
	return (
		<header className="header">
			<div className="headerTitle">
				<h1>Webshop</h1>
			</div>

			<div className="headerNav">
				<div className="headerMenu">
					<HamburgerMenu
						categories={props.categories}
						onCategorySelect={props.onCategorySelect}
					/>
				</div>

				<div className="headerSearch">
					<ItemInput placeholder="Sök..." />
					<span className="searchIcon">🔍</span>
				</div>

				<div className="headerCart">
					<ShoppingCart
						addedProducts={props.addedProducts}
						onAddProduct={props.onAddProduct}
						displayQuantity={props.displayQuantity}
						onClearCart={props.onClearCart}
					/>
				</div>
			</div>
		</header>
	);
}

export default ItemHeader;
