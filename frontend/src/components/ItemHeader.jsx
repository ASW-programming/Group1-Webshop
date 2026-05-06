import { startTransition, useState } from "react";
import { useSearchParams, useLocation, Link } from "react-router-dom";
import ItemButton from "./ItemButton";
import ItemInput from "./ItemInput";
import HamburgerMenu from "./HamburgerMenu";
import ShoppingCart from "./ShoppingCart";
import { SearchIcon } from "../assets/Icons";
import { useShop } from "../utils/context.jsx";

function ItemHeader() {
	const [inputValue, setInputValue] = useState("");
	const [searchParams, setSearchParams] = useSearchParams();
	const location = useLocation();
	const { selectCategory } = useShop();

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
		startTransition(() => {
			selectCategory(null);
		});
		setSearchParams({ q: inputValue.trim() });
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
