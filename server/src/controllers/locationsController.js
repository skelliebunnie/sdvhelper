import Location from "../models/Location.js";

export async function getAllLocations(_, res) {
	try {
		// this will sort it by the name by default
		const locations = (await Location.find().sort({ name: 1 }));
		res.status(200).json(locations);
		
	} catch(error) {
		// server failed
		console.error("error in getAllLocations controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export async function getLocationById(req, res) {
	try {
		const location = await Location.findById(req.params.id);
		if(!location) return res.status(404).json({message: "Item Type not found"});
		res.status(200).json(location);
	} catch(error) {
		console.error("Error in getLocationById controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function createLocation(req, res) {
	try {
		const {
			name,
			addedBy
		} = req.body;
		
		const newLocation = new Location({
			name,
			addedBy
		});
		
		const savedLocation = await newLocation.save();
		res.status(201).json(savedLocation);
	} catch(error) {
		// server failed
		console.error("error in createLocation controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function updateLocation(req, res) {
	try {
		const {
			name,
			addedBy
		} = req.body;
		
		const updatedLocation = await Location.findByIdAndUpdate(
			req.params.id, {
				name,
				addedBy
			}
		);
		
		if(!updatedLocation) return res.status(404).json({message: "Item Type not found"});
		
		res.status(200).json(updatedLocation);
		
	} catch(error) {
		// server failed
		console.error("error in updateLocation controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function deleteLocation(req, res) {

	try {
		const deletedLocation = await Location.findByIdAndDelete(req.params.id);
		
		if(!deletedLocation) return res.status(404).json({message: "Item Type not found"});
		
		res.status(200).json({ message: "Item Type deleted successfully" });
		
	} catch(error) {
		// server failed
		console.error("error in deleteLocation controller", error);
		res.status(500).json({ message: "Internal server error" });
	}
};