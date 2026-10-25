import ItemType from "../models/ItemType.js";

export async function getAllItemTypes(_, res) {
	try {
		// this will sort it by the name by default
		const itemTypes = (await ItemType.find().sort({ name: 1 }));
		res.status(200).json(itemTypes);
		
	} catch(error) {
		// server failed
		console.error("error in getAllItemTypes controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export async function getItemTypeById(req, res) {
	try {
		const itemType = await ItemType.findById(req.params.id);
		if(!itemType) return res.status(404).json({message: "Item Type not found"});
		res.status(200).json(itemType);
	} catch(error) {
		console.error("Error in getItemTypeById controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function createItemType(req, res) {
	try {
		const {
			name,
			addedBy
		} = req.body;
		
		const newItemType = new ItemType({
			name,
			addedBy
		});
		
		const savedItemType = await newItemType.save();
		res.status(201).json(savedItemType);
	} catch(error) {
		// server failed
		console.error("error in createItemType controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function updateItemType(req, res) {
	try {
		const {
			name,
			addedBy
		} = req.body;
		
		const updatedItemType = await ItemType.findByIdAndUpdate(
			req.params.id, {
				name,
				addedBy
			}
		);
		
		if(!updatedItemType) return res.status(404).json({message: "Item Type not found"});
		
		res.status(200).json(updatedItemType);
		
	} catch(error) {
		// server failed
		console.error("error in updateItemType controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function deleteItemType(req, res) {

	try {
		const deletedItemType = await ItemType.findByIdAndDelete(req.params.id);
		
		if(!deletedItemType) return res.status(404).json({message: "Item Type not found"});
		
		res.status(200).json({ message: "Item Type deleted successfully" });
		
	} catch(error) {
		// server failed
		console.error("error in deleteItemType controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
};