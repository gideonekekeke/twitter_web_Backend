const { default: mongoose } = require("mongoose");
const tweetSchema = require("../Models/TweetsModel");
const userSchema = require("../Models/UserModel");
const cloudinary = require("../Utils/cloudinary");
const getTweet = async (req, res) => {
	try {
		const fetchTweet = await tweetSchema.find().sort({ createdAt: "desc" });

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
const getSingleTweet = async (req, res) => {
	try {
		const fetchTweet = await tweetSchema.findById(req.params.id).populate({
			path: "comment",
			options: {
				sort: { createdAt: -1 },
			},
		});

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

const createTweetText = async (req, res) => {
	try {
		const getUser = await userSchema.findById(req.params.id);
		const tweeting = await tweetSchema.create({
			title: req.body.title,
		});
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
const createTweetImage = async (req, res) => {
	try {
		const getUser = await userSchema.findById(req.params.id);
		const Image = await cloudinary.uploader.upload(req.file.path);
		const tweeting = await tweetSchema.create({
			title: req.body.title,
			tweetImage: Image.secure_url,
		});
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
const createTweetOnlyImage = async (req, res) => {
	try {
		const getUser = await userSchema.findById(req.params.id);
		const Image = await cloudinary.uploader.upload(req.file.path);
		const tweeting = await tweetSchema.create({
			tweetImage: Image.secure_url,
		});
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

const RemoveTweet = async (req, res) => {
	const getUser = await userSchema.findById(req.params.id);

	const deleteData = await tweetSchema.findByIdAndRemove(req.params.project);
	getUser.your_tweet.pull(deleteData);
	getUser.save();
	res.status(200).json({
		status: "deleted",
		data: getUser,
	});
};

module.exports = {
	getTweet,
	getSingleTweet,
	RemoveTweet,
	createTweetText,
	createTweetOnlyImage,
	createTweetImage,
};
