import { useState } from "react";
import ItemButton from "./ItemButton";

function HamburgerMenu({ categories, onCategorySelect }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () =>
        setIsOpen(!isOpen);

    const handleCategoryClick = (category) => {
        setIsOpen(false);
        onCategorySelect(category)
    }

    return (
        <div>
            <ItemButton
                onClick={toggleMenu}
                className="hamburger-btn"
                text={isOpen ? 'x' : '☰'}
            />
            {isOpen && (
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
