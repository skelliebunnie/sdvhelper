import { useState, useEffect } from "react"
import { PencilIcon, TrashIcon } from "lucide-react"
import { Link } from "react-router"
import toast from "react-hot-toast"
import api from "../../lib/axios";

import RateLimitMessage from "../Messages/RateLimitMessage"
import LoadingMessage from "../Messages/LoadingMessage";

const NoLocations = () => {
	return (
		<h2>No Locations Found</h2>
	)
}

const LocationList = ({ data, setLocations }) => {
	const locations = data || {};
	
	const handleDelete = async(e, name, locationId) => {
		e.preventDefault();
		
		if(!window.confirm(`Are you sure you want to delete the location ${name}?`)) return;
		
		try {
			await api.delete(`/locations/${locationId}`)
			
			setLocations((prev) => prev.filter(prev => prev._id !== locationId));
			
			toast.success(`Location ${name} deleted successfully!`);
		} catch(error) {
			console.error("Error deleting location", error);
			toast.error(`Failed to delete ${name} - something went wrong`);
		}
	}
	
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>From</th>
					<th>Edit/Delete</th>
				</tr>
			</thead>
			<tbody>
				{locations ? locations.map(location => (
					<tr key={location._id} data-id={location._id}>
						<th>{location.name ? location.name : ""}</th>
						<th>{location.addedBy}</th>
						<th className="edit-delete">
							<div className="icon-link"><Link to={`/location/edit/${location._id}`}><PencilIcon size={32} /></Link></div>
							<div className="icon-link" onClick={(e) => handleDelete(e, location.name, location._id)}><TrashIcon size={32} /></div>
						</th>
					</tr>
				)) : "No locations"}
			</tbody>
		</table>
	)
}

const AllItemTypes = () => {
	const [isRateLimited, setIsRateLimited] = useState(false);
	const [locations, setLocations] = useState([]);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		const fetchItems = async () => {
			try {
				const res = await api.get("/locations");
				setLocations(res.data);
				setIsRateLimited(false);
				
			} catch(error) {
				console.error("Error fetching locations");
				if(error.response.status == 429) {
					setIsRateLimited(true);
				} else {
					toast.error("Failed to load locations");
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
		{!loading && locations.length === 0 && !isRateLimited && <NoLocations /> }
		{!loading && locations.length > 0 && <LocationList data={locations} setLocations={setLocations} />}
		</>
	)
}

export default AllItemTypes;