import mongoose from "mongoose";

// 1 - create schema
// 2 - model based off that schema

const itemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Item Name required"]
	},
	category: { type: mongoose.Schema.ObjectId, ref: 'Category' },
	description: String,
	// source: String,
	recipeSource: [String],
	ingredients: [{ type: mongoose.Schema.ObjectId, ref: 'Item' }],
	equipment: String,
	sellable: Boolean,
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
	locations: [{ 
		season: String,
		locations: [{
			type: mongoose.Schema.ObjectId, 
			ref: 'Location'
		}]
	 }],
	weather: String,
	time: [{
		season: String,
		intervals: [{
			open: {
				type: Number,
				required: false,
				unique: false,
				validate: {
					validator: Number.isInteger,
					message: "{VALUE} is not an integer"
				}
			},
			close: {
				type: Number,
				required: false,
				unique: false,
				validate: {
					validator: Number.isInteger,
					message: "{VALUE} is not an integer"
				}
			},
		}]
	}],
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
	// initialGrowthTime: {
	// 	type: Number,
	// 	required: false,
	// 	unique: false,
	// 	validate: {
	// 		validator: Number.isInteger,
	// 		message: "{VALUE} is not an integer"
	// 	}
	// },
	// reproductionTime: {
	// 	type: Number,
	// 	required: false,
	// 	unique: false,
	// 	validate: {
	// 		validator: Number.isInteger,
	// 		message: "{VALUE} is not an integer"
	// 	}
	// },
	baseEnergy: {
		type: Number,
		required: false,
		unique: false,
		validate: {
			validator: Number.isInteger,
			message: "{VALUE} is not an integer"
		}
	},
	baseHealth: {
		type: Number,
		required: false,
		unique: false,
		validate: {
			validator: Number.isInteger,
			message: "{VALUE} is not an integer"
		}
	},
	dyepotColor: String,
	sewingColor: String,
	qiColorQuest: Boolean,
	universal: {
		type: Number,
		required: false,
		unique: false,
		min: 0,
		max: 5,
		validate: {
			validator: Number.isInteger,
			message: "{VALUE} is not an integer"
		}
	},
	addedBy: {
		type: String,
		required: [true, "How did the item get added to the game?"],
		defaultValue: 'Vanilla'
	}
}, { timestamps: true });

const Item = mongoose.model("Item", itemSchema);

export default Item;