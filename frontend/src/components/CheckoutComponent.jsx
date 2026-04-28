import ItemInput from "./ItemInput"
import ItemButton from "./ItemButton"
import { useState } from "react"

function CheckoutComponent({ addedProducts = [], onAddProduct, onClearCart }) {

    const [name, setName] = useState("")

    const [checkout, setCheckout] = useState(false)

    // Count total cost, .reduce() go through each product and puts the price together.
    const totalPrice = addedProducts.reduce(
        (sum, product) => sum + product.price * product.quantity, 0
    )

    // Function goes on when client clicks on "Go to pay".
    const handleCheckout = () => {

        if (!name.trim()) {
            alert("Write your name before going to payment")
            return
        }

        if (addedProducts.length === 0) {
            alert("Shopping cart is empty!")
            return
        }

        setCheckout(true)

    }
    //When checkout is true show frindly message.
    if (checkout) {
        return (
            <div className="checkout-cart">
                <h2>Thank you for your order!</h2>
                <p>We will let you know when your order is ready for you to pick it up!</p>
            </div>
        )
    }

    return (
        <div className="cart-overview">

            <h2 className="cart-title">Your shopping cart</h2>

            {/* If addedProducts is empty, show the message, else show the list. Create a new HTML-element for each product in the list */}
            {addedProducts.length === 0 ? (
                <p className="cart-empty">Your shopping cart is empty</p>
            ) : (

                <ul className="cart-list">

                    {addedProducts.map((product) => (

                        // "Key" is mandatory in React, helps to keep in track of which line is which one.
                        <li key={product.id} className="cart-item">

                            <div className="cart-item-info">

                                <img src={product.imageUrl} alt={product.name} className="cart-item-image" />

                                <span className="cart-Item-name">{product.name}</span>

                            </div>

                            <div className="cart-item-price">

                                <span className="cart-label-price">Price</span>

                                <span>{`${product.price} kr`}</span>

                            </div>

                            <div className="cart-item-controls">

                                <ItemButton
                                    text="➖"
                                    className="cart-btn-minus"
                                    onClick={() => onAddProduct(product, - 1)}
                                ></ItemButton>

                                <span className="cart-item-quantity">{product.quantity}</span>

                                <ItemButton
                                    text="➕"
                                    className="cart-btn-plus"
                                    onClick={() => onAddProduct(product, 1)}
                                ></ItemButton>

                                <ItemButton
                                    text="🗑"
                                    className="cart-btn-del-item"
                                    onClick={() => onAddProduct(product, -product.quantity)}
                                ></ItemButton>

                            </div>

                            <div className="cart-item-total">

                                <span className="cart-label-total">Total</span>

                                {/* .toFixed(2) rounds to 2 decimal */}
                                <span className="cart-total-price">
                                    {(product.price * product.quantity).toFixed(2)} kr
                                </span>

                            </div>

                        </li>

                    ))}

                </ul>

            )}

            <h2 className="cart-divider"></h2>

            <div className="cart-total-row">

                <span className="cart-total-cost">Total cost</span>

                <span className="cart-total-price-cost">{totalPrice.toFixed(2)} kr</span>

            </div>

            <div className="cart-actions">

                <ItemButton
                    text="Empty cart"
                    className="cart-delete-btn"
                    onClick={onClearCart}
                ></ItemButton>

                <ItemButton
                    text="Go to pay"
                    className="cart-pay-btn"
                    onClick={handleCheckout}
                ></ItemButton>

            </div>

            <div className="cart-name-section">

                <label htmlFor="cart-name-input" className="cart-name-label">Your name  </label>

                <ItemInput
                    className="cart-name-input"
                    id="cart-name-input"
                    placeholder="Write your name here..."
                    onChange={(e) => setName(e.target.value)}
                ></ItemInput>

            </div>

        </div>
    )

}

export default CheckoutComponent