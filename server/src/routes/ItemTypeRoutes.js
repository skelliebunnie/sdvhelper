import express from "express";
import { 
	getAllItemTypes,
	getItemTypeById,
	createItemType,
	updateItemType,
	deleteItemType
 } from "../controllers/itemTypesController.js";

const router = express.Router();

router.get("/", getAllItemTypes);
router.get("/:id", getItemTypeById);

router.post("/", createItemType);
router.put("/edit/:id", updateItemType);
router.delete("/:id", deleteItemType);

export default router;

