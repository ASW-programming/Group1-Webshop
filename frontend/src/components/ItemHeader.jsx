import ItemButton from "./ItemButton"
import ItemInput from "./ItemInput"
import HamburgerMenu from "./HamburgerMenu"

function ItemHeader(props) {
    return (
        <header>
            <div>
                <h1>Adams Gains</h1>
            </div>

            <div>
                <div>
                    <HamburgerMenu/>
                </div>

                <div>
                    <span className="search-icon">🔍</span>
                    <ItemInput placeholder="Sök..."/>
                </div>

                <div>
                    <ItemButton text="🛒"/>
                </div>
            </div>

        </header>
    )
}

export default ItemHeader