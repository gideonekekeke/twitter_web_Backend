const { getTweet, createTweet } = require("../Controller/TweetsController");
const express = require("express");

const router = express.Router();

router.get("/", getTweet);
router.post("/tweeting/:id", createTweet);

module.exports = router;
