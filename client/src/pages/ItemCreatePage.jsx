import { useState, useEffect } from "react"

import Button from "../components/Button"

const ItemCreatePage = ({ sourceList }) => {

	const [formData, setFormData] = useState({
		itemName: "",
		addedBy: "Vanilla",
	});
	const [loading, setLoading] = useState(false);
	const [isRateLimited, setIsRateLimited] = useState(false);
	const [itemCreated, setItemCreated] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
	}

	return (
		<>
			<div className="page-wrapper">
				<main className="page-container">
					<form>
						<label htmlFor="itemName">Item Name
							<input type="text" name="itemName" id="itemName" value={formData.itemName} onChange={(e) => setFormData({ ...formData, itemName: e.target.value })} />
						</label>
						<fieldset>
							{sourceList && sourceList.length > 0 ? sourceList.map(source => (
								<label key={source} htmlFor={source}>
									<input
										type="radio"
										value={source}
										checked={formData.addedBy === source}
										onChange={(e) => setFormData({ ...formData, addedBy: e.target.value })}
									/>
									{source}
								</label>
							)) : <p>No sources available (defaulting to Vanilla)</p>}
						</fieldset>
						<button type="submit" onClick={handleSubmit}>Submit</button>
					</form>
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

export default ItemCreatePage;