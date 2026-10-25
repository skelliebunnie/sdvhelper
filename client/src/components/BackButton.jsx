import { Link } from "react-router"
import { ArrowLeftIcon } from "lucide-react-motion";

const BackButton = () => {
	return (
		<div className="back-button">
			<Link to={"/"}>
				<ArrowLeftIcon size={24} /> Home
			</Link>
		</div>
	)
}

export default BackButton;