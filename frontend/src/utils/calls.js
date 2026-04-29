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

export const postOrders = async (orderData) => {
	const postOrder = await fetch(`${BASE_URL}/api/orders`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(orderData),
	});

	if (!postOrder.ok) {
		throw new Error("Failed to create order");
	}

	const data = await postOrder.json();
	return data;
};

export const getOrders = async (req, res) => {
	const getOrder = await fetch(`${BASE_URL}/api/orders`, {
		method: "GET",
	});

	if (!getOrder.ok) {
		throw new Error("Failed to get orders");
	}

	const data = await getOrder.json();
	return data;
};
