const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
	{
		title: {
			type: String,
		},
		user: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "users",
			},
		],
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("comments", commentSchema);
