import ItemButton from "./ItemButton";
import { useShop } from "../utils/context";
import { HamburgerIcon, CancelIcon } from "../assets/Icons";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function HamburgerMenu() {
	const { categories, activeCategory, selectCategory } = useShop();
	const [searchParams, setSearchParams] = useSearchParams();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	const handleCategoryClick = (category) => {
		selectCategory(category);
		setSearchParams({});
		toggleMenu();
	};

	return (
		<div>
			<ItemButton
				title={isMenuOpen ? "Close Menu" : "Show Categories"}
				onClick={toggleMenu}
				className="hamburgerBtn"
				icon={isMenuOpen ? <CancelIcon /> : <HamburgerIcon />}
			/>

			{isMenuOpen && (
				<div className="menuPanel">
					<div
						className={`categoryItem ${!activeCategory ? "activeCategory" : ""}`}
						onClick={() => handleCategoryClick("")}>
						Alla Produkter
					</div>
					{categories?.map((category) => (
						<div
							key={category}
							className={`categoryItem ${activeCategory === category ? "activeCategory" : ""}`}
							onClick={() => handleCategoryClick(category)}>
							<span>
								{activeCategory === category ? "✓ " : ""}
							</span>
							{category}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default HamburgerMenu;
