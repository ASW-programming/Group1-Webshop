import { useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ItemButton from "./ItemButton";
import ItemInput from "./ItemInput";
import HamburgerMenu from "./HamburgerMenu";
import ShoppingCart from "./ShoppingCart";
import { SearchIcon } from "../assets/Icons";

function ItemHeader() {
	const inputRef = useRef("");
	const navigate = useNavigate();
	const location = useLocation();

	const shopName = "GigaMat";

	const handleSearch = () => {
		const value = inputRef.current.trim();
		if (value) navigate(`/?q=${encodeURIComponent(value)}`);
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") handleSearch();
	};

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
						<h1>{shopName}</h1>
					</Link>
				</div>

				<div className="headerNav">
					<div className="headerMenu">
						<HamburgerMenu />
					</div>
					<div className="headerSearch">
						<ItemInput
							className="headerSearchInput"
							placeholder="Sök..."
							onChange={(e) => {
								inputRef.current = e.target.value;
							}}
							onKeyDown={handleKeyDown}
						/>
						<ItemButton
							className="headerSearchButton"
							type="button"
							icon={<SearchIcon />}
							onClick={handleSearch}
						/>
					</div>

					<div className="headerCart">
						<ShoppingCart />
					</div>
				</div>
			</div>
		</header>
	);
}

export default ItemHeader;
