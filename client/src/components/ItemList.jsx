import { useState, useEffect } from "react"
import { CheckIcon, XIcon, PencilIcon, TrashIcon } from "lucide-react"
import { Link } from "react-router"
import toast from "react-hot-toast"
import axios from "axios"

import RateLimitMessage from "../components/RateLimitMessage"

const ItemList = ({ data }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Type</th>
					<th>Source</th>
					<th>Edible</th>
					<th>From</th>
					<th>Edit/Delete</th>
				</tr>
			</thead>
			<tbody>
				{data.map(item => (
					<tr key={item._id} data-id={item._id}>
						<th>{item.itemName ? item.itemName : ""}</th>
						<th>{item.type ? item.type : ""}</th>
						<th>{item.source ? item.source : ""}</th>
						<th>{item.edible && item.edible == true ? <CheckIcon size={32} /> : <XIcon size={32} />}</th>
						<th>{item.addedBy}</th>
						<th class="edit-delete">
							<div className="icon-link"><Link target={`/edit/${item._id}`}><PencilIcon size={32} /></Link></div>
							<div className="icon-link"><Link target={`/delete/${item._id}`}><TrashIcon size={32} /></Link></div>
						</th>
					</tr>
				))}
			</tbody>
		</table>
	)
}

const AllItems = () => {
	const [isRateLimited, setIsRateLimited] = useState(false);
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		const fetchItems = async () => {
			try {
				const res = await axios.get("http://localhost:5001/api/items");
				setItems(res.data);
				setIsRateLimited(false);
				
			} catch(error) {
				console.error("Error fetching items");
				if(error.response.status == 429) {
					setIsRateLimited(true);
				} else {
					toast.error("Failed to load items");
				}
			} finally {
				setLoading(false);
			}
		}
		
		fetchItems();
	}, []);
	
	return (
		<>
		{isRateLimited && <RateLimitMessage type="warn" />}
		{loading && <div className="loading">Loading Items ...</div>}
		{!loading && items.length > 0 && <ItemList data={items} />}
		</>
	)
}

export default AllItems;