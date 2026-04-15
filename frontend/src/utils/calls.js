const BASE_URL = "http://localhost:3000"; // Backend adress.

// ---- GET fetches all products or one----
export const getProducts = async (id = null) => {
	const validId =
		typeof id === "string" || typeof id === "number" ? id : null;

	const url = validId
		? `${BASE_URL}/api/products/${id}`
		: `${BASE_URL}/api/products`;

	const response = await fetch(url, {
		method: "GET",
	});

	if (!response.ok) {
		throw new Error(`Couldn't get the products.`);
	}

	return response.json();
};
