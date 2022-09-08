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
const { upload, CoverUpload } = require("../Utils/multer");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getSingleUsers);
router.post("/register", RegisterUser);
router.post("/login", LoginUser);
// router.patch("/editedProfileImage/:id", upload, EditImage);
// router.patch("/editedCoverImage/:id", EditCoverImage);

router.patch("/editedProfile/:id", EditProfile);

router.route("/editedProfileImage/:id").patch(upload, EditImage);
router.route("/editedCoverImage/:id").patch(CoverUpload, EditCoverImage);

module.exports = router;
