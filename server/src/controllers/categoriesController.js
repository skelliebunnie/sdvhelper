import Category from "../models/Category.js";

export async function getAllCategories(_, res) {
	try {
		// this will sort it by the name by default
		const categories = (await Category.find().sort({ name: 1 }));
		res.status(200).json(categories);
		
	} catch(error) {
		// server failed
		console.error("error in getAllCategories controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export async function getCategoryById(req, res) {
	try {
		const category = await Category.findById(req.params.id);
		if(!category) return res.status(404).json({message: "Category not found"});
		res.status(200).json(category);
	} catch(error) {
		console.error("Error in getCategoryById controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function createCategory(req, res) {
	try {
		const {
			name,
			addedBy
		} = req.body;
		
		const newCategory = new Category({
			name,
			addedBy
		});
		
		const savedCategory = await newCategory.save();
		res.status(201).json(savedCategory);
	} catch(error) {
		// server failed
		console.error("error in createCategory controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function updateCategory(req, res) {
	try {
		const {
			name,
			addedBy
		} = req.body;
		
		const updatedCategory = await Category.findByIdAndUpdate(
			req.params.id, {
				name,
				addedBy
			}
		);
		
		if(!updatedCategory) return res.status(404).json({message: "Category not found"});
		
		res.status(200).json(updatedCategory);
		
	} catch(error) {
		// server failed
		console.error("error in updateCategory controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function deleteCategory(req, res) {

	try {
		const deletedCategory = await Category.findByIdAndDelete(req.params.id);
		
		if(!deletedCategory) return res.status(404).json({message: "Category not found"});
		
		res.status(200).json({ message: "Category deleted successfully" });
		
	} catch(error) {
		// server failed
		console.error("error in deleteCategory controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
};