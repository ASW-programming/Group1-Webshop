import ItemButton from "./ItemButton"
import ItemInput from "./ItemInput"
import HamburgerMenu from "./HamburgerMenu"

function ItemHeader(props) {
    return (
        <header className="header">
            <div className="headerTitle">
                <h1>Webshop</h1>
            </div>

            <div className="headerNav">
                <div className="headerMenu">
                    <HamburgerMenu
                        categories={props.categories}
                        onCategorySelect={props.onCategorySelect}
                    />
                </div>

                <div className="headerSearch">
                    <ItemInput placeholder="Sök..."/>
                    <span className="searchIcon">🔍</span>
                </div>

                <div className="headerCart">
                    <ItemButton text="🛒"/>
                </div>
            </div>
        </header>
    )
}

export default ItemHeader