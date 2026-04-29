import ItemInput from "./ItemInput";
import HamburgerMenu from "./HamburgerMenu";
import ShoppingCart from "./ShoppingCart";

function ItemHeader() {

	return (
		<header className="header">
			<div className="headerTitle">
				<h1>Webshop</h1>
			</div>

			<div className="headerNav">
				<div className="headerMenu">
					<HamburgerMenu/>
				</div>

				<div className="headerSearch">
					<ItemInput placeholder="Sök..." />
					<span className="searchIcon">🔍</span>
				</div>

				<div className="headerCart">
					<ShoppingCart
						
					/>
				</div>
			</div>
		</header>
	);
}

export default ItemHeader;
