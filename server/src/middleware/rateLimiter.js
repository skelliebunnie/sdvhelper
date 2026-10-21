import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
	try {
		// TODO: add auth checks to rate limit *per user*
		const { success } = await ratelimit.limit("my-limit-key");
		
		if(!success) {
			return res.status(429).json({
				message: "Too many requests, please try again later"
			});
		}
		// continue if success
		next();
		
	} catch(error) {
		console.error("Rate limit error", error);
		next(error);
	}
}

export default rateLimiter;