import Item from "../models/Item.js";
import ItemType from "../models/ItemType.js";

export async function getAllItems(_, res) {
	try {
		// this will sort it by the name by default
		const items = (
			await Item.find().sort({ name: 1 })
				.populate("type")
				.exec()
		);
			
		console.log(items);
		res.status(200).json(items);
		
	} catch(error) {
		// server failed
		console.error("error in getAllItems controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export async function getItemById(req, res) {
	try {
		const item = await Item.findById(req.params.id);
		if(!item) return res.status(404).json({message: "Item not found"});
		res.status(200).json(item);
	} catch(error) {
		console.error("Error in getItemById controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function createItem(req, res) {
	try {
		const {
			name,
			description,
			type,
			source,
			recipeSource,
			ingredients,
			sellPrice,
			edible,
			difficulty,
			behavior,
			size,
			initialGrowthTime,
			reproductionTime,
			processingTime,
			color,
			qiColorQuest,
			addedBy
		} = req.body;
		
		const newItem = new Item({
			name,
			description,
			type,
			source,
			recipeSource,
			ingredients,
			sellPrice,
			edible,
			difficulty,
			behavior,
			size,
			initialGrowthTime,
			reproductionTime,
			processingTime,
			color,
			qiColorQuest,
			addedBy
		});
		
		const savedItem = await newItem.save();
		res.status(201).json(savedItem);
	} catch(error) {
		// server failed
		console.error("error in createItem controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function updateItem(req, res) {
	try {
		const {
			name,
			description,
			type,
			source,
			recipeSource,
			ingredients,
			sellPrice,
			edible,
			difficulty,
			behavior,
			size,
			initialGrowthTime,
			reproductionTime,
			processingTime,
			color,
			qiColorQuest,
			addedBy
		} = req.body;
		
		const updatedItem = await Item.findByIdAndUpdate(
			req.params.id, {
				name,
				description,
				type,
				source,
				recipeSource,
				ingredients,
				sellPrice,
				edible,
				difficulty,
				behavior,
				size,
				initialGrowthTime,
				reproductionTime,
				processingTime,
				color,
				qiColorQuest,
				addedBy
			}
		);
		
		if(!updatedItem) return res.status(404).json({message: "Item not found"});
		
		res.status(200).json(updatedItem);
		
	} catch(error) {
		// server failed
		console.error("error in updateItem controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function deleteItem(req, res) {

	try {
		const deletedItem = await Item.findByIdAndDelete(req.params.id);
		
		if(!deletedItem) return res.status(404).json({message: "Item not found"});
		
		res.status(200).json({ message: "Item deleted successfully" });
		
	} catch(error) {
		// server failed
		console.error("error in deleteItem controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
};