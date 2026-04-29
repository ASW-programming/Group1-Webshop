import ItemInput from "./ItemInput";
import HamburgerMenu from "./HamburgerMenu";
import ShoppingCart from "./ShoppingCart";
import { useLocation } from "react-router-dom";

function ItemHeader() {
	const location = useLocation();
	const shopName = "Webshop";

	if (
		location.pathname === "/checkout" ||
		location.pathname === "/orderHistory"
	)
		return (
			<div className="headerTitle">
				<h1>{shopName}</h1>
			</div>
		);

	return (
		<header className="header">
			<div className="headerTitle">
				<h1>{shopName}</h1>
			</div>

			<div className="headerNav">
				<div className="headerMenu">
					<HamburgerMenu />
				</div>

				<div className="headerSearch">
					<ItemInput placeholder="Sök..." />
					<span className="searchIcon">🔍</span>
				</div>

				<div className="headerCart">
					<ShoppingCart />
				</div>
			</div>
		</header>
	);
}

export default ItemHeader;
