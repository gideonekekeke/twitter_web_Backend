const {
	getTweet,
	createTweetText,
	createTweetImage,
	createTweetOnlyImage,
	getSingleTweet,
	RemoveTweet,
} = require("../Controller/TweetsController");
const express = require("express");
const { TweetUpload } = require("../Utils/multer");

const router = express.Router();

router.get("/", getTweet);
router.get("/:id", getSingleTweet);
router.post("/tweetingtext/:id", createTweetText);
router.post("/tweetingimage/:id", TweetUpload, createTweetImage);
router.post("/tweetingonlyimage/:id", TweetUpload, createTweetOnlyImage);
router.delete("/tweetingRemove/:id/:project", RemoveTweet);

module.exports = router;
