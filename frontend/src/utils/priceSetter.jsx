const priceInfo = (product) => {
        if (product.reducedPrice) {
            return (
                <div className="priceContainer">
                    <span className="salePrice">{product.reducedPrice} kr</span>
                    <span className="savings">Sparat: {product.price - product.reducedPrice} kr</span>
                    <span className="originalPrice" style={{textDecoration: 'line-through'}}>{product.price} kr</span>
                </div>
            )
        } else{
            return <span className="productPrice">{product.price} kr</span>
        }
        
    }

    export { priceInfo };