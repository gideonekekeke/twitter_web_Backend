const mongoose = require("mongoose");

const followerSchema = mongoose.Schema(
	{
		userFollower: {
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

module.exports = mongoose.model("followers", followerSchema);
