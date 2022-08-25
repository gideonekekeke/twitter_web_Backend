const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
		},
		username: {
			type: String,
		},
		bio: {
			type: String,
		},
		profileImage: {
			type: String,
		},
		coverImage: {
			type: String,
		},
		email: {
			type: String,
		},
		password: {
			type: String,
		},
		following: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "followings",
			},
		],
		follower: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "followers",
			},
		],
		your_tweet: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "tweets",
			},
		],
		reply: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "replies",
			},
		],
		media: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "medias",
			},
		],
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("users", userSchema);
