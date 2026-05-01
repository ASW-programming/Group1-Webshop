import ItemButton from "./ItemButton";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../utils/calls.js";
import { ReturnIcon, HomeIcon, SortIcon } from "../assets/Icons.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";

function OrderHistory() {
	const [sortCategory, setSortCategory] = useState("orderID");
	const [sortAscending, setSortAscending] = useState(true);

	const {
		data: orders,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["orders"],
		queryFn: getOrders,
	});

	const formatDate = (createdAt) =>
		createdAt ? new Date(createdAt).toLocaleString("sv-SE") : "Okänt datum";

	const handleSort = (key) => {
		if (sortCategory !== key) setSortAscending(true);
		else setSortAscending((prev) => !prev);
		setSortCategory(key);
	};

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

			<table className="orderTable">
				<thead>
					<tr className="orderCategories">
						<th
							className={
								sortCategory === "orderID"
									? "chosen"
									: "notChosen"
							}
							onClick={() => handleSort("orderID")}>
							<SortIcon
								style={{
									visibility:
										sortCategory === "orderID"
											? "visible"
											: "hidden",
								}}
								transform={
									sortAscending ? "rotate(180, 8.5, 5.5)" : ""
								}
							/>{" "}
							Order #
						</th>
						<th
							className={
								sortCategory === "createdAt"
									? "chosen"
									: "notChosen"
							}
							onClick={() => handleSort("createdAt")}>
							<SortIcon
								style={{
									visibility:
										sortCategory === "createdAt"
											? "visible"
											: "hidden",
								}}
								transform={
									sortAscending ? "rotate(180, 8.5, 5.5)" : ""
								}
							/>
							Datum
						</th>
						<th
							className={
								sortCategory === "customer"
									? "chosen"
									: "notChosen"
							}
							onClick={() => handleSort("customer")}>
							<SortIcon
								style={{
									visibility:
										sortCategory === "customer"
											? "visible"
											: "hidden",
								}}
								transform={
									sortAscending ? "rotate(180, 8.5, 5.5)" : ""
								}
							/>
							Kund
						</th>
						<th>Produkt</th>
						<th>Antal</th>
						<th>Pris</th>
						<th
							className={
								sortCategory === "totalPrice"
									? "chosen"
									: "notChosen"
							}
							onClick={() => handleSort("totalPrice")}>
							<SortIcon
								style={{
									visibility:
										sortCategory === "totalPrice"
											? "visible"
											: "hidden",
								}}
								transform={
									sortAscending ? "rotate(180, 8.5, 5.5)" : ""
								}
							/>
							Total
						</th>
					</tr>
				</thead>
				<tbody>
					{orders
						?.slice()
						.sort((a, b) => {
							const choiceA = a[sortCategory];
							const choiceB = b[sortCategory];

							if (!sortCategory) return 0;

							// Checks if Choice A is a string and not a date. If not a date then isNaN = true and return to sort String
							if (
								typeof choiceA === "string" &&
								isNaN(Date.parse(choiceA))
							) {
								// Checks if A is greater than B with support of Swedish Letters
								return sortAscending
									? choiceA.localeCompare(choiceB, "sv-SE")
									: choiceB.localeCompare(choiceA, "sv-SE");
							}

							// Checks the date if its newer or older.
							if (typeof choiceA === "string") {
								return sortAscending
									? new Date(choiceA) - new Date(choiceB)
									: new Date(choiceB) - new Date(choiceA);
							}

							// Sorts numbers
							return sortAscending
								? choiceA - choiceB
								: choiceB - choiceA;
						})
						.map((o) =>
							o.items.map((i, index) => (
								<tr
									key={`${o.id}-${i.id}`}
									className="orderRow">
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
											{o.totalPrice} kr
										</td>
									)}
								</tr>
							)),
						)}
				</tbody>
			</table>
		</div>
	);
}

export default OrderHistory;
