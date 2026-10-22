import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import cors from "cors";

dotenv.config();

// routes
import itemsRoutes from "./routes/itemsRoutes.js";

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(cors({
	origin: process.env.CLIENT_URI || "http://localhost:5173",
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	//credentials: true // required if sending cookings or auth headers
}));

app.use(express.json()); // parses JSON bodies: req.body
app.use(rateLimiter);

app.use("/api/items", itemsRoutes);

//TODO: app.use("/api/npcs", npcsRoutes);

// connect to database before connecting to app/server
connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server listening on PORT ${PORT}`);
	});
});