const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
	{
		title: {
			type: String,
		},
		userCommented: {
			type: String,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "tweets",
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("comments", commentSchema);
