import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ItemButton from "./ItemButton";
import ItemInput from "./ItemInput";
import HamburgerMenu from "./HamburgerMenu";
import ShoppingCart from "./ShoppingCart";
import { SearchIcon } from "../assets/Icons";

function ItemHeader() {
    const inputRef = useRef("");
    const navigate = useNavigate();

    const handleSearch = () => {
        const value = inputRef.current.trim();
        if (value) navigate(`/?q=${encodeURIComponent(value)}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <header className="header">
            <div className="headerTitle">
                <h1>Webshop</h1>
            </div>

            <div className="headerNav">
                <div className="headerMenu">
                    <HamburgerMenu />
                </div>

                <div className="headerSearch">
                    <ItemInput
                        placeholder="Sök..."
                        onChange={(e) => { inputRef.current = e.target.value; }}
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
        </header>
    );
}

export default ItemHeader;