const { default: mongoose } = require("mongoose");
const myLike = require("../Models/LikeModel");
const tweetSchema = require("../Models/TweetsModel");
const userModel = require("../Models/UserModel");

// const postLike = async (req, res) => {
// 	try {
// 		const tweetUser = await tweetSchema.findById(req.params.id);

// 		const creatingLike = await myLike.create({
// 			user: req.body.user,
// 			like: 1,
// 		});

// 		creatingLike.post = tweetUser;

// 		await creatingLike.save();

// 		tweetUser.like.push(mongoose.Types.ObjectId(creatingLike._id));

// 		await tweetUser.save();

// 		res.status(200).json({
// 			message: "successful",
// 			data: creatingLike,
// 		});
// 	} catch (err) {
// 		res.status(404).json({ message: err.message });
// 	}
// };

const postLike = async (req, res) => {
	try {
		const likePost = await tweetSchema.findByIdAndUpdate(
			req.params.post,
			{
				$push: { like: req.params.id },
			},
			{ new: true },
		);

		res.status(201).json({ message: "Post Liked", data: likePost });
		// }
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const getAllLike = async (req, res) => {
	try {
		const fetchLike = await myLike.find();

		res.status(200).json({
			message: "successful",
			data: fetchLike,
		});
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

const getSingleLike = async (req, res) => {
	try {
		const fetching = await myLike.findById(req.params.id);
		res.status(200).json({
			message: "successful",
			data: fetching,
		});
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

// const removeLike = async (req, res) => {
// 	try {
// 		const tweetUser = await tweetSchema.findById(req.params.id);

// 		const removing = await myLike.findByIdAndRemove(req.params.project);

// 		tweetUser.like.pull(removing);

// 		res.status(200).json({
// 			message: "successful",
// 			data: removing,
// 		});
// 	} catch (err) {
// 		res.status(404).json({ message: err.message });
// 	}
// };

const removeLike = async (req, res) => {
	try {
		const likePost = await tweetSchema.findByIdAndUpdate(
			req.params.post,
			{
				$pull: { like: req.params.id },
			},
			{ new: true },
		);

		res.status(201).json({ message: "Liked Deleted", data: likePost });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

module.exports = {
	getAllLike,
	postLike,
	removeLike,
	getSingleLike,
};
