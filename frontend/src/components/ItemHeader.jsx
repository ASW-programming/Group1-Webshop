import { useLocation, Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import ShoppingCart from "./ShoppingCart";
import SearchBar from "./SearchBar.jsx";
import { useShop } from "../utils/context.jsx";

function ItemHeader() {
	const { selectCategory } = useShop();
	const location = useLocation();

	const shopName = "GigaMat";

	if (
		location.pathname === "/checkout" ||
		location.pathname === "/orderHistory"
	)
		return (
			<div className="headerContainer2">
				<div className="headerTitle">
					<Link to="/">
						<h1>{shopName}</h1>
					</Link>
				</div>
			</div>
		);

	return (
		<header className="header">
			<div className="headerContainer">
				<div className="headerTitle">
					<Link to="/">
						<h1
							onClick={() => {
								selectCategory(null);
							}}>
							{shopName}
						</h1>
					</Link>
				</div>

				<div className="headerNav">
					<div className="headerMenu">
						<HamburgerMenu />
					</div>
					<SearchBar />
					<div className="headerCart">
						<ShoppingCart />
					</div>
				</div>
			</div>
		</header>
	);
}

export default ItemHeader;
