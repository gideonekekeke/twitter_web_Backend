const mongoose = require("mongoose");

const LikeSchema = mongoose.Schema(
	{
		like: {
			type: Number,
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

module.exports = mongoose.model("tweets", LikeSchema);
