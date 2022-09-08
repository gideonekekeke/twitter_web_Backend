const mongoose = require("mongoose");

const LikeSchema = mongoose.Schema(
	{
		// like: {
		// 	type: Number,
		// 	default: 1,
		// },

		_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},

		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "tweets",
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("likes", LikeSchema);
