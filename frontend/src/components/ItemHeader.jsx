import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ItemButton from "./ItemButton";
import ItemInput from "./ItemInput";
import HamburgerMenu from "./HamburgerMenu";
import ShoppingCart from "./ShoppingCart";
import { SearchIcon } from "../assets/Icons";

function ItemHeader() {
	const [inputValue, setInputValue] = useState("");
	const navigate = useNavigate();
	const location = useLocation();

	const shopName = "GigaMat";

	if (
		location.pathname === "/checkout" ||
		location.pathname === "/orderHistory"
	)
		return (
			<div className="headerTitle">
				<Link to="/">
					<h1>{shopName}</h1>
				</Link>
			</div>
		);

	const handleSearch = () => {
		const value = inputValue.trim();
		navigate(`/?q=${encodeURIComponent(value)}`);
		setInputValue("");
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") handleSearch();
	};

	return (
		<header className="header">
			<div className="headerContainer">
				<div className="headerTitle">
					<Link to="/">
						<h1>GigaMat</h1>
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
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
						<ItemButton
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
