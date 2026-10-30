import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	// this lets us keep track of all the items associated with a specific type
	// more easily
	associatedItems: [{ type: mongoose.Schema.ObjectId, ref: 'Item' }],
	// I don't think mods can add item categories, but we'll leave this just in case
	addedBy: {
		type: String,
		required: true,
		defaultValue: 'Vanilla'
	}
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;