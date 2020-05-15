const mongoose = require('../db/connection');

const jobSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: String,
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Job', jobSchema);
