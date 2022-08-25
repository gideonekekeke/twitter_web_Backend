const {
	getAllUsers,
	RegisterUser,
	LoginUser,
	EditImage,
	EditCoverImage,
	EditProfile,
	getSingleUsers,
} = require("../Controller/userController");
const express = require("express");
const upload = require("../Utils/multer");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getSingleUsers);
router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.patch("/editedProfileImage/:id", EditImage);
router.patch("/editedCoverImage/:id", EditCoverImage);
router.patch("/editedCoverImage/:id", EditCoverImage);
router.patch("/editedProfile/:id", EditProfile);

module.exports = router;
