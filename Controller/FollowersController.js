const mongoose = require("mongoose");
const follSchema = require("../Models/FollowersModel");
const userSchema = require("../Models/UserModel");

const getFollowers = async (req, res) => {
	try {
		const creating = await follSchema.find();

		res.status(200).json({
			message: "successful",
			data: creating,
		});
	} catch (err) {
		res.status(404).json({
			message: "an error occured",
		});
	}
};

const createFollowers = async (req, res) => {
	try {
		const getUser = await userSchema.findById(req.params.id);

		const creating = new follSchema(req.body);

		creating.user = getUser;

		await creating.save();

		getUser.follower.push(mongoose.Types.ObjectId(creating._id));
		await getUser.save();

		res.status(201).json({
			message: "following successful",
			data: creating,
		});
	} catch (err) {
		res.status(404).json({
			message: "an error occured",
		});
	}
};

const removeFollower = async (req, res) => {
	try {
		const getUser = await userSchema.findById(req.params.id);

		const getFollw = await follSchema.findByIdAndRemove(req.params.project);

		getUser.follower.pull(getFollw);
		getUser.save();

		res.status(200).json({
			message: "successful",
			data: getUser,
		});
	} catch (err) {
		res.status(404).json({
			message: "an error occured",
		});
	}
};

module.exports = {
	createFollowers,
	getFollowers,
	removeFollower,
};
