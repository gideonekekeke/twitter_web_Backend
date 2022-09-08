const mongoose = require("mongoose");

const followingSchema = mongoose.Schema(
	{
		userFollow: {
			type: String,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("followings", followingSchema);
