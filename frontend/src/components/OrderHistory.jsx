import ItemButton from "./ItemButton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOrders, deleteOrder } from "../utils/calls.js";
import { ReturnIcon, HomeIcon, EmptyListIcon } from "../assets/Icons.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";

function OrderHistory() {
	const queryClient = useQueryClient();

	const [deletingId, setDeletingId] = useState(null);

	const {
		data: orders,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["orders"],
		queryFn: getOrders,
	});

	const { mutate, isPending } = useMutation({
		mutationFn: deleteOrder,
		async onMutate(deletedOrder) {
			setDeletingId(deletedOrder);

			await new Promise((resolve) => setTimeout(resolve, 750));

			// Stop current fetches
			await queryClient.cancelQueries({ queryKey: ["orders"] });

			// Save current data
			const previousOrders = queryClient.getQueryData(["orders"]);

			//Update Cache with new value
			queryClient.setQueryData(["orders"], (old) =>
				old.filter((u) => u.id !== deletedOrder),
			);

			return { previousOrders };
		},
		onError: (err, newOrder, context) => {
			setDeletingId(null);
			//Undo if it went wrong
			queryClient.setQueryData(["orders"], context.previousOrders);
			console.error("Something went wrong:", err);
		},
		onSettled: () => {
			setDeletingId(null);
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
	});

	const formatDate = (createdAt) =>
		createdAt ? new Date(createdAt).toLocaleString("sv-SE") : "Okänt datum";

	if (isLoading) return <p>Loading</p>;
	if (isError) return <p>Error</p>;

	return (
		<div>
			<div className="navigationBtns">
				<Link to="/">
					<ItemButton title="Homepage" icon={<HomeIcon />} />
				</Link>

				<ItemButton
					title="Go back"
					icon={<ReturnIcon />}
					onClick={() => window.history.back()}
				/>
			</div>

			{orders.length > 0 ? (
				<table className="orderTable">
					<thead>
						<tr>
							<th>Order #</th>
							<th>Datum</th>
							<th>Kund</th>
							<th>Produkt</th>
							<th>Antal</th>
							<th>Pris</th>
							<th>Total</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders?.map((o) =>
							o.items.map((i, index) => (
								<tr
									key={`${o.id}-${i.id}`}
									className={`orderRow ${deletingId === o.id ? "slideOutLeft" : ""}`}>
									{index === 0 && (
										<td rowSpan={o.items.length}>
											{o.orderIDFormatted ||
												"Order ID Saknas"}
										</td>
									)}

									{index === 0 && (
										<td rowSpan={o.items.length}>
											{formatDate(o.createdAt)}
										</td>
									)}

									{index === 0 && (
										<td
											rowSpan={o.items.length}
											className="orderCustomer">
											{o.customer}
										</td>
									)}
									<td className="orderImage orderName">
										<img
											src={i.imageUrl}
											className="orderItemImage"
										/>
										{i.name}
									</td>
									<td className="orderQuantity">
										{i.quantity} st
									</td>
									<td className="orderPrice">
										{i.reducedPrice
											? i.reducedPrice
											: i.price}{" "}
										kr
									</td>
									{index === 0 && (
										<td
											rowSpan={o.items.length}
											className="orderTotal">
											{o.price} kr
										</td>
									)}
									{index === 0 && (
										<td rowSpan={o.items.length}>
											<ItemButton
												title="Delete Order"
												icon={<EmptyListIcon />}
												onClick={() => {
													if (
														window.confirm(
															`Delete order ${o.orderIDFormatted}?`,
														)
													) {
														mutate(o.id);
													}
												}}
											/>
										</td>
									)}
								</tr>
							)),
						)}
					</tbody>
				</table>
			) : (
				<h2>No orders placed yet</h2>
			)}
		</div>
	);
}

export default OrderHistory;
