import mongoose from "mongoose";

export async function connectDB() {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("You successfully connected to MongoDB!");
		return mongoose;
		
	} catch (err) {
		console.error("error connectiong to MongoDB", err);
		process.exit(1); // exit with failure; 0 = success
	}
}