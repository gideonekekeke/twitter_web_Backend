const {
	getFollowers,
	removeFollower,
	createFollowers,
} = require("../Controller/FollowersController");
const express = require("express");

const router = express.Router();

router.get("/", getFollowers);

router.post("/fol/:id", createFollowers);
router.delete("/followerRemove/:id/:project", removeFollower);

module.exports = router;
