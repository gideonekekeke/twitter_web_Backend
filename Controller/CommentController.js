const { default: mongoose } = require("mongoose");
const commentSchema = require("../Models/CommentModel");
const tweetSchema = require("../Models/TweetsModel");

const postComment = async (req, res) => {
	try {
		const getUser = await tweetSchema.findById(req.params.id);

		const commenting = new commentSchema(req.body);

		commentSchema.user = getUser;

		await commenting.save();
		getUser.comment.push(mongoose.Types.ObjectId(commenting._id));
		await getUser.save();

		res.status(200).json({
			message: "successful",
			data: commenting,
		});
	} catch (err) {
		res.status(404).json({
			message: "an error occurred",
		});
	}
};

const getComments = async (req, res) => {
	try {
		const getingComment = await commentSchema.find();

		res.status(200).json({
			message: "successful",
			data: getingComment,
		});
	} catch (err) {
		res.status(404).json({
			message: "an error occurred",
		});
	}
};

const deleteComment = async (req, res) => {
	try {
		const getUser = await tweetSchema.findById(req.params.id);
		const com = await commentSchema.findByIdAndRemove(req.params.project);

		getUser.comment.pull(com);
		getUser.save();

		res.status(200).json({
			status: "deleted",
			data: getUser,
		});
	} catch (err) {
		res.status(404).json({
			message: "an error occurred",
		});
	}
};

module.exports = {
	postComment,
	getComments,
	deleteComment,
};
