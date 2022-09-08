const {
	createFollowing,
	getFollowing,
	removeFollowing,
} = require("../Controller/FollowingController");
const express = require("express");

const router = express.Router();

router.get("/", getFollowing);

router.post("/folln/:id", createFollowing);
router.delete("/followingRemove/:id/:project", removeFollowing);

module.exports = router;
