const {
	getAllUsers,
	RegisterUser,
	LoginUser,
} = require("../Controller/userController");
const express = require("express");
const { upload, CoverUpload } = require("../Utils/multer");
const router = express.Router();

router.get("/", getAllUsers);
router.post("/register", RegisterUser);
router.post("/login", LoginUser);

module.exports = router;
