const router = require("express").Router();
const {
  getOneUser,
  getAllUsers,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  getPersonalAccount,
  updateProfilePicture,
  removeFollower,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

router.get("/personal", protect, getPersonalAccount);

router.route("/:userId").put(protect, updateUser).delete(protect, deleteUser);

router.get("/:username", getOneUser);

router.put("/:userId/follow", protect, followUser);
router.put("/:userId/unfollow", protect, unfollowUser);
router.put("/:userId/removefollower", protect, removeFollower);
router.put("/:userId/profilepicture", protect, updateProfilePicture);

router.get("/", getAllUsers);

module.exports = router;
