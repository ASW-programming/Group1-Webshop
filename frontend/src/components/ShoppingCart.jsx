import { useState, useEffect } from "react";
import ItemButton from "./ItemButton";

function ShoppingCart() {
    const [isOpen, setIsOpen] = useState(false);

    const [addedProducts, setAddedProducts] = useState(() => {
        const saved = localStorage.getItem('shoppingCart');
        return saved ? JSON.parse(saved) : [];
    })

    useEffect(() => {
        localStorage.setItem('shoppingCart', JSON.stringify(addedProducts))
    }, [addedProducts]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            setAddedProducts(addedProducts.filter(p => p.id !== productId))
        } else {
            setAddedProducts(addedProducts.map(product =>
                product.id === productId
                ? {...product, quantity: newQuantity} : product
            ))
        }
    }

    const totalPrice = addedProducts?.map(product => product.price * product.quantity)
        .reduce((sum, productTotal) => sum + productTotal, 0) || 0;



    return (
        <div>
            <ItemButton
                onClick={toggleMenu}
                className="shoppingcart-btn"
                text={isOpen ? 'x' : '🛒'}
            />
            {isOpen && (
                <div className="shopping-list">
                    <ul>
                        {addedProducts?.map(product => (
                            <li key={product.id}>
                                {product.imageUrl}{' '}
                                {product.name}{' '}
                                {product.price}kr{'  '}
                                Antal: <ItemButton text="-" onClick={() => updateQuantity(product.id, product.quantity - 1)}></ItemButton>{product.quantity}<ItemButton text="+" onClick={() => updateQuantity(product.id, product.quantity + 1)}></ItemButton>
                            </li>
                        ))}
                    </ul>
                    <h4>Total: {totalPrice}kr</h4>
                </div>
            )}
        </div>
    )

}

export default ShoppingCart;