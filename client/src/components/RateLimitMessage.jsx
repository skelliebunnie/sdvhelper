import { ZapIcon } from "lucide-react";

import "../styles/message.css";

const RateLimitMessage = ({ type = "success" }) => {
	return (
		<div className={`rate-limit message ${type}`}>
			<div className="icon-wrapper">
				<ZapIcon size={48} />
			</div>
			<div className="text">
				<h2>Rate Limit Reached</h2>
				<p>You've made too many requests in a short period. Please wait a moment.</p>
				<small>Try again in a few seconds for the best experience.</small>
			</div>
		</div>
	)
}

export default RateLimitMessage;