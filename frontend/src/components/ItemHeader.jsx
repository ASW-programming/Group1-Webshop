import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemButton from "./ItemButton";
import ItemInput from "./ItemInput";
import HamburgerMenu from "./HamburgerMenu";
import ShoppingCart from "./ShoppingCart";
import { useLocation } from "react-router-dom";
import { SearchIcon } from "../assets/Icons";
import { Link } from "react-router-dom";
import { useShop } from "../utils/context";

function ItemHeader() {
	const inputRef = useRef("");
	const navigate = useNavigate();
	const location = useLocation();
	const { addedProducts } = useShop();

	const shopName = "GigaMat";

	const totalPrice =
		addedProducts
			?.map((product) => {
				const price = product.reducedPrice || product.price;
				return price * product.quantity;
			})
			.reduce((sum, productTotal) => sum + productTotal, 0) || 0;

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
		const value = inputRef.current.trim();
		if (value) navigate(`/?q=${encodeURIComponent(value)}`);
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
							onChange={(e) => {
								inputRef.current = e.target.value;
							}}
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
