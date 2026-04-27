import ItemButton from "./ItemButton";
import { useShop } from "../utils/context";

function HamburgerMenu() {
    const {categories, isMenuOpen, toggleMenu} = useShop();

    const handleCategoryClick = (category) => {
        toggleMenu();
        // onCategorySelect(category)
    }

    return (
        <div>
            <ItemButton
                onClick={toggleMenu}
                className="hamburger-btn"
                text={isMenuOpen ? 'x' : '☰'}
            />
            {isMenuOpen && (
                <div className="menu-panel">
                    {categories?.map(category => (
                        <div
                            key={category}
                            className="category-item"
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}


export default HamburgerMenu;
