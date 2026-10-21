import { CheckIcon, XIcon, PencilIcon, TrashIcon } from "lucide-react"
import { Link } from "react-router"
import Button from "./Button.jsx"

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
					<tr data-id={item._id}>
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

export default ItemList;