import ItemButton from "./ItemButton";
import { useShop } from "../utils/context";
import { useState } from "react";

function HamburgerMenu() {
	const {
		categories,
		activeCategory,
		selectCategory,
	} = useShop();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
        const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	const handleCategoryClick = (category) => {
		selectCategory(category);
		toggleMenu();
	};

	return (
		<div>
			<ItemButton
				onClick={toggleMenu}
				className="hamburger-btn"
				text={isMenuOpen ? "x" : "☰"}
			/>
			{isMenuOpen && (
				<div className="menu-panel">
					{categories?.map((category) => (
						<div
							key={category}
							className={`category-item ${activeCategory === category ? "active" : ""}`}
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
