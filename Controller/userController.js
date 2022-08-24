const userSchema = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const getAllUsers = async (req, res) => {
	try {
		const getUsers = await userSchema.find();

		res.status(200).json({
			message: "successful",
			data: getUsers,
		});
	} catch (err) {
		res.status(404).json({
			message: "an error occured",
		});
	}
};

const RegisterUser = async (req, res) => {
	try {
		const { name, username, email, password } = req.body;
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		// const profileUpload = await cloudinary.uploader.upload(
		// 	"",
		// );

		// const coverUpload = await cloudinary.uploader.upload(
		// 	"https://i.stack.imgur.com/l60Hf.png",
		// );
		const regUser = await userSchema.create({
			name,
			username,
			email,
			password: hash,
			profileImage: "https://i.stack.imgur.com/l60Hf.png",
			coverImage:
				"https://windows10wall.com/wp-content/uploads/2013/10/twitter-backgrounds-background-blue-body.jpg",
		});

		const token = jwt.sign({ _id: regUser._id }, "TwiIteErBuIUldtOkeN", {
			expiresIn: "20m",
		});
		res.status(200).json({
			message: "successful",
			data: { regUser, token },
		});
	} catch (err) {
		res.status(404).json({
			message: "an error occured",
		});
	}
};

const LoginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await userSchema.findOne({ email: email });

		if (user) {
			const CheckPassword = await bcrypt.compare(password, user.password);

			if (CheckPassword) {
				const { password, ...info } = user._doc;

				const token = jwt.sign(
					{
						_id: user._id,
					},
					"TwiIteErBuIUldtOkeN",
					{ expiresIn: "20m" },
				);
				return res.status(200).json({
					message: `welcome Back ${user.name}`,
					data: {
						...info,
						token,
					},
				});
			} else {
				return res.status(400).json({ message: "Password is incorrect" });
			}
		} else {
			return res.status(400).json({ message: "Email Does Not Exist" });
		}
	} catch (err) {
		return res.status(404).json({ message: "an error occured" });
	}
};

// const LoginUser = async (req, res) => {
// 	try {
// 		const { email, password } = req.body;

// 		const user = await userSchema.findOne({ email: email });

// 		if (user) {
// 			const checkPassword = await bcrypt.compare(password, user.password);

// 			if (checkPassword) {
// 				const { password, ...info } = user._doc;

// 				const token = jwt.sign(
// 					{
// 						_id: user._id,
// 						email: user.email,
// 					},
// 					"TwiIteErBuIUldtOkeN",
// 					{ expiresIn: "20m" },
// 				);
// 				return res.status(200).json({
// 					message: "successful",
// 					data: {
// 						...info,
// 						token,
// 					},
// 				});
// 			} else {
// 				return res.status(404).json({
// 					message: "Authentication failed",
// 				});
// 			}
// 		} else {
// 			return res.status(404).json({
// 				message: "Authentication failed",
// 			});
// 		}
// 	} catch (err) {
// 		return res.status(404).json({
// 			message: "an error occured",
// 		});
// 	}
// };

module.exports = {
	getAllUsers,
	RegisterUser,
	LoginUser,
};
