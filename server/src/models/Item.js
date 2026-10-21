import mongoose from "mongoose";

// 1 - create schema
// 2 - model based off that schema

const itemSchema = new mongoose.Schema({
	itemName: {
		type: String,
		required: true
	},
	type: String,
	description: String,
	source: String,
	recipeSource: [ String ],
	ingredients: [{ type: mongoose.Schema.ObjectId, ref: 'Item' }],
	equipment: String,
	sellPrice: {
		type: Number,
		required: false,
		unique: false,
		validate: {
			validator: Number.isInteger,
			message: "{VALUE} is not an integer"
		}
	},
	edible: Boolean,
	difficulty: {
		type: Number,
		required: false,
		unique: false,
		validate: {
			validator: Number.isInteger,
			message: "{VALUE} is not an integer"
		}
	},
	behavior: String,
	size: String,
	initialGrowthTime: {
		type: Number,
		required: false,
		unique: false,
		validate: {
			validator: Number.isInteger,
			message: "{VALUE} is not an integer"
		}
	},
	reproductionTime: {
		type: Number,
		required: false,
		unique: false,
		validate: {
			validator: Number.isInteger,
			message: "{VALUE} is not an integer"
		}
	},
	processingTime: {
		type: Number,
		required: false,
		unique: false,
		validate: {
			validator: Number.isInteger,
			message: "{VALUE} is not an integer"
		}
	},
	color: String,
	qiColorQuest: Boolean,
	addedBy: {
		type: String,
		required: true,
		defaultValue: 'Vanilla'
	}
}, { timestamps: true });

const Item = mongoose.model("Item", itemSchema);

export default Item;