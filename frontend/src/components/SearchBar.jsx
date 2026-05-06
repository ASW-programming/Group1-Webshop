import { useShop } from "../utils/context.jsx";
import ItemButton from "./ItemButton.jsx";
import ItemInput from "./ItemInput.jsx";
import { useState, startTransition } from "react";
import { SearchIcon } from "../assets/Icons.jsx";
import { useNavigate } from "react-router-dom";

function SearchBar() {
	const { filteredProducts, selectCategory } = useShop();
	const [inputValue, setInputValue] = useState("");
	const navigate = useNavigate();

	const handleSearch = () => {
		startTransition(() => {
			selectCategory(null);
		});
		navigate(`/?q=${inputValue.trim()}`);
		setInputValue("");
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") handleSearch();
	};
	return (
		<div className="headerSearch">
			<ItemInput
				className="headerSearchInput"
				placeholder="Sök..."
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<ItemButton
				title="Search"
				className="headerSearchButton"
				type="button"
				icon={<SearchIcon />}
				onClick={handleSearch}
			/>
		</div>
	);
}

export default SearchBar;
