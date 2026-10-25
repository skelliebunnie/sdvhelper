import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	// mods can add sooo many locations, including new ones to Vanilla maps!
	addedBy: {
		type: String,
		required: true,
		defaultValue: 'Vanilla'
	}
}, { timestamps: true });

const Location = mongoose.model("Location", locationSchema);

export default Location;