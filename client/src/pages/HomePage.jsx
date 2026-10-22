import toast from "react-hot-toast"

import AllItems from "../components/ItemList"
import Button from "../components/Button"

const HomePage = () => {
	return (
		<>
			<div className="page-wrapper">
				<main className="page-container">
					<AllItems />
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