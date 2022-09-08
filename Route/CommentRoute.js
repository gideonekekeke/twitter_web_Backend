const {
	postComment,
	getComments,
	deleteComment,
} = require("../Controller/CommentController");
const express = require("express");

const router = express.Router();

router.get("/", getComments);
router.post("/comme/:id", postComment);
router.delete("/commenting/:id/:project", deleteComment);

module.exports = router;
