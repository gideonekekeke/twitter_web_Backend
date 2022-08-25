const { default: mongoose } = require("mongoose");
const tweetSchema = require("../Models/TweetsModel");
const userSchema = require("../Models/UserModel");

const getTweet = async (req, res) => {
	try {
		const fetchTweet = await tweetSchema.find();

		res.status(200).json({
			message: "successful",
			data: fetchTweet,
		});
	} catch (err) {
		res.status(404).json({
			messsage: "an error occured creating",
		});
	}
};

const createTweet = async (req, res) => {
	try {
		const getUser = await userSchema.findById(req.params.id);
		const tweeting = new tweetSchema(req.body);
		tweeting.user = getUser;
		await tweeting.save();
		getUser.your_tweet.push(mongoose.Types.ObjectId(tweeting._id));
		await getUser.save();

		res.status(201).json({
			message: "Tweet Created SuccessFull",
			data: tweeting,
		});
	} catch (err) {
		res.status(404).json({
			messsage: "an error occured creating",
		});
	}
};

module.exports = {
	createTweet,
	getTweet,
};
