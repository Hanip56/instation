const router = require("express").Router();
const {
  getOneUser,
  getAllUsers,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  getPersonalAccount,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

router.get("/personal", protect, getPersonalAccount);

router.route("/:userId").put(protect, updateUser).delete(protect, deleteUser);

router.get("/:username", getOneUser);

router.put("/:userId/follow", protect, followUser);
router.put("/:userId/unfollow", protect, unfollowUser);

router.get("/", getAllUsers);

module.exports = router;
