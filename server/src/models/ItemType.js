import mongoose from "mongoose";

const itemTypeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	// this lets us keep track of all the items associated with a specific type
	// more easily
	associatedItems: [{ type: mongoose.Schema.ObjectId, ref: 'Item' }],
	// I don't think mods can add item types, but we'll leave this just in case
	addedBy: {
		type: String,
		required: true,
		defaultValue: 'Vanilla'
	}
}, { timestamps: true });

const ItemType = mongoose.model("ItemType", itemTypeSchema);

export default ItemType;