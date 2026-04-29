import ItemButton from "./ItemButton";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../utils/calls.js";
import { ReturnIcon, HomeIcon } from "../assets/Icons.jsx";
import { Link } from "react-router-dom";

function OrderHistory() {
	const {
		data: orders,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["orders"],
		queryFn: getOrders,
	});

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
					<tr>
						<th>Kund</th>
						<th>Bild</th>
						<th>Produkt</th>
						<th>Antal</th>
						<th>Pris</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					{orders?.map((o) =>
						o.items.map((i, index) => (
							<tr key={`${o.id}-${i.id}`} className="orderRow">
								{index === 0 && (
									<td
										rowSpan={o.items.length}
										className="orderCustomer">
										{o.customer}
									</td>
								)}
								<td className="orderImage">
									<img
										src={i.imageUrl}
										className="orderItemImage"
									/>
								</td>
								<td className="orderName">{i.name}</td>
								<td className="orderQuantity">
									{i.quantity} st
								</td>
								<td className="orderPrice">
									{i.reducedPrice ? i.reducedPrice : i.price}{" "}
									kr
								</td>
								{index === 0 && (
									<td
										rowSpan={o.items.length}
										className="orderTotal">
										{o.price} kr
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
