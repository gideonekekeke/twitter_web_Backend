const {
	getAllLike,
	getSingleLike,
	postLike,
	removeLike,
} = require("../Controller/LikeController");
const express = require("express");

const router = express.Router();

router.get("/", getAllLike);
router.get("/", getSingleLike);
router.post("/like/:id/:post", postLike);
router.delete("/unlike/:id/:post", removeLike);

module.exports = router;
