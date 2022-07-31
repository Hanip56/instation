const router = require("express").Router();
const {
  getOneUser,
  getAllUsers,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");
// get one user

router
  .route("/:userId")
  .get(getOneUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

router.put("/:userId/follow", protect, followUser);
router.put("/:userId/unfollow", protect, unfollowUser);

router.get("/", getAllUsers);

module.exports = router;
