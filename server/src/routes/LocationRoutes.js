import express from "express";
import { 
	getAllLocations,
	getLocationById,
	createLocation,
	updateLocation,
	deleteLocation
 } from "../controllers/LocationsController.js";

const router = express.Router();

router.get("/", getAllLocations);
router.get("/:id", getLocationById);

router.post("/", createLocation);
router.put("/edit/:id", updateLocation);
router.delete("/:id", deleteLocation);

export default router;

