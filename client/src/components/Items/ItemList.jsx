import { useState, useEffect } from "react"
import { CheckIcon, XIcon, PencilIcon, TrashIcon } from "lucide-react"
import { Link } from "react-router"
import toast from "react-hot-toast"
import api from "../../lib/axios";

import RateLimitMessage from "../Messages/RateLimitMessage"
import LoadingMessage from "../Messages/LoadingMessage";

const NoItems = () => {
	return (
		<h2>No Items Found</h2>
	)
}

const ItemList = ({ data, setItems }) => {
	const items = data || {};
	
	const handleDelete = async(e, name, itemId) => {
		e.preventDefault();
		
		if(!window.confirm(`Are you sure you want to delete the item ${name}?`)) return;
		
		try {
			await api.delete(`/items/${itemId}`)
			
			setItems((prev) => prev.filter(prev => prev._id !== itemId));
			
			toast.success(`${name} deleted successfully!`);
		} catch(error) {
			console.error("Error deleting item", error);
			toast.error(`Failed to delete ${name} - something went wrong`);
		}
	}
	
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Type</th>
					<th>Locations</th>
					<th>Edible</th>
					<th>From</th>
					<th>Edit/Delete</th>
				</tr>
			</thead>
			<tbody>
				{items ? items.map(item => (
					<tr key={item._id} data-id={item._id}>
						<th>{item.name ? item.name : ""}</th>
						<th>{item.type ? item.type.name : ""}</th>
						<th>{item.locations && item.locations.length > 0 ? (
							item.locations.map(location => (
								<span>{location.name}</span>
							))
						): ("")}</th>
						<th>{item.edible && item.edible == true ? <CheckIcon size={32} /> : <XIcon size={32} />}</th>
						<th>{item.addedBy}</th>
						<th className="edit-delete">
							<div className="icon-link"><Link to={`/item/edit/${item._id}`}><PencilIcon size={32} /></Link></div>
							<div className="icon-link"><button onClick={(e) => handleDelete(e, item.name, item._id)}><TrashIcon size={32} /></button></div>
						</th>
					</tr>
				)) : "No items"}
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
				const res = await api.get("/items");
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
		{loading && <LoadingMessage />}
		{!loading && items.length === 0 && !isRateLimited && <NoItems /> }
		{!loading && items.length > 0 && <ItemList data={items} setItems={setItems} />}
		</>
	)
}

export default AllItems;