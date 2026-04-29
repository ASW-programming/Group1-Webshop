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
			<ItemButton
				icon={<ReturnIcon />}
				onClick={() => window.history.back()}
			/>

			<Link to="/">
				<ItemButton icon={<HomeIcon />} />
			</Link>

			{orders.map((o) => (
				<li key={o.id} style={{ border: "1px solid black" }}>
					{o.customer}
					<div
						style={{
							display: "flex",
							gap: "10px",
							listStyle: "none",
						}}>
						{o.items.map((i) => (
							<div
								style={{
									display: "flex",
									flexDirection: "row",
								}}>
								<img
									src={i.imageUrl}
									style={{ width: "25px", height: "25px" }}
								/>
								<p
									key={i.id}
									style={{
										display: "flex",
										flexDirection: "column",
									}}>
									{i.name} {i.quantity}st{" "}
									{i.reducedPrice ? i.reducedPrice : i.price}{" "}
									kr
								</p>
							</div>
						))}
					</div>
					<p>Total: {o.price} kr</p>
				</li>
			))}
		</div>
	);
}

export default OrderHistory;
