const BASE_URL = "http://localhost:3000" // Backend adressen.

// ---- GET Hämtar alla produkter eller EN ----
export const getProducts = async (id = null) => {

    const url = id ? `${BASE_URL}/api/products/${id}` : `${BASE_URL}/api/products`

    const response = await fetch(url, {
        method: 'GET'
    })

    if (!response.ok) {
        throw new Error(`Could't get the products.`)
    }

    return response.json()

}