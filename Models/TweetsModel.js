const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema(
	{
		title: {
			type: String,
		},

		tweetImage: {
			type: String,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
		like: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "users",
			},
		],

		comment: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "comments",
			},
		],
		share: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "shares",
			},
		],
		re_tweet: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "retweets",
			},
		],
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("tweets", tweetSchema);
