import { Link } from "react-router"
import { PlusIcon } from "lucide-react"

import "../styles/button.css"

const Button = ({ target, type = ""}) => {
	return (
		<div className={`button ${type}`}>
			<Link to={target}>
				<PlusIcon />
			</Link>
		</div>
	)
}

export default Button