require("dotenv").config();
require("./dbConfig/databaseConfig");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 18000;
const http = require("http");
const app = express();

const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server, { cors: { origin: "*" } });
const db = mongoose.connection;

io.on("connection", (socket) => {
	console.log("user connected", socket.id);
});

db.on("open", () => {
	const dbConnect = db.collection("users").watch();
	const dbConnectTweet = db.collection("tweets").watch();

	dbConnect.on("change", (change) => {
		console.log(change);
		if (change.operationType === "insert") {
			const file = {
				_id: change.fullDocument._id,
				username: change.fullDocument.username,
				email: change.fullDocument.email,
				password: change.fullDocument.password,
				bio: change.fullDocument.bio,
				profileImage: change.fullDocument.profileImage,
				coverImage: change.fullDocument.coverImage,
				following: change.fullDocument.following,
				follower: change.fullDocument.follower,
				reply: change.fullDocument.reply,
				media: change.fullDocument.media,
				createdAt: change.fullDocument.createdAt,
				your_tweet: change.fullDocument.your_tweet,
			};
			io.emit("observerUser", file);
			console.log(file);
		}
	});
});
db.on("open", () => {
	const dbConnectTweet = db.collection("tweets").watch();

	dbConnectTweet.on("change", (change) => {
		console.log(change);
		if (change.operationType === "insert") {
			const file = {
				_id: change.fullDocument._id,
				title: change.fullDocument.title,
				tweetImage: change.fullDocument.tweetImage,
				user: change.fullDocument.user,
				like: change.fullDocument.like,
				comment: change.fullDocument.comment,
				share: change.fullDocument.share,
				re_tweet: change.fullDocument.re_tweet,
				createdAt: change.fullDocument.createdAt,
			};
			io.emit("observerTweet", file);
			console.log("this is the tweet file", file);
		}
	});
});
db.on("open", () => {
	const dbConnectComment = db.collection("comments").watch();

	dbConnectComment.on("change", (change) => {
		console.log(change);
		if (change.operationType === "insert") {
			const file = {
				_id: change.fullDocument._id,
				title: change.fullDocument.title,
				user: change.fullDocument.user,
				createdAt: change.fullDocument.createdAt,
			};
			io.emit("observerComment", file);
			console.log(file);
		}
	});
});

app.use(cors());
app.use(express.json());
app.use("/api/user", require("./Route/UserRoutes"));
app.use("/api/tweet", require("./Route/TweetRoute"));

server.listen(port, () => {
	console.log(`listening on port ${port}`);
});
