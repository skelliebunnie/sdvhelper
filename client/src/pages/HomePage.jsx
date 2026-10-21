import { useState, useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"

import Button from "../components/Button"
import RateLimitMessage from "../components/RateLimitMessage"
import ItemList from "../components/ItemList"

const HomePage = () => {
	const [isRateLimited, setIsRateLimited] = useState(false);
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		const fetchItems = async () => {
			try {
				const res = await axios.get("http://localhost:5000/api/items");
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
			<div className="page-wrapper">
				<main className="page-container">
					{isRateLimited && <RateLimitMessage type="warn" />}
					{loading && <div className="loading">Loading Items ...</div>}
					{!loading && items.length > 0 && <ItemList data={items} />}
				</main>
				
				<div className="nav-buttons">
					<div className="create">
						<Button target="/item/create" type="create" />
					</div>
				</div>
			</div>
		</>
	)
}

export default HomePage;