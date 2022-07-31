const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc    get one user
// @route   GET /api/user/:userId
// @access  PUBLIC
const getOneUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});

// @desc    get all user
// @route   GET /api/user/:userId
// @access  PUBLIC
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

// @desc    update one user
// @route   PUT /api/user/:userId
// @access  PRIVATE
const updateUser = asyncHandler(async (req, res) => {
  if (req.params.userId !== req.user._id.toString()) {
    res.status(403);
    throw new Error("You just can update your account");
  }

  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });

  res.status(201).json(updatedUser);
});

// @desc    delete one user
// @route   DELETE /api/user/:userId
// @access  PRIVATE
const deleteUser = asyncHandler(async (req, res) => {
  if (req.params.userId !== req.user._id.toString()) {
    res.status(403);
    throw new Error("You just can delete your account");
  }

  const deletedUser = await User.findByIdAndDelete(req.params.userId);

  res.status(200).json(deletedUser._id);
});

// @desc    follow one user
// @route   PUT /api/user/:userId/follow
// @access  PRIVATE
const followUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { _id } = req.user;

  if (userId === _id.toString()) {
    res.status(403);
    throw new Error("Action Forbidden");
  }

  const currentUser = await User.findById(_id);
  const targetUser = await User.findById(userId);

  if (!currentUser.followings.includes(userId)) {
    await targetUser.updateOne({ $push: { followers: _id } });
    await currentUser.updateOne({ $push: { followings: userId } });

    res.status(200).json("User Followed");
  } else {
    res.status(400).json("You already followed this account");
  }
});

// @desc    unfollow one user
// @route   PUT /api/user/:userId/unfollow
// @access  PRIVATE
const unfollowUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { _id } = req.user;

  if (userId === _id.toString()) {
    res.status(403);
    throw new Error("Action Forbidden");
  }

  const currentUser = await User.findById(_id);
  const targetUser = await User.findById(userId);

  if (currentUser.followings.includes(userId)) {
    await targetUser.updateOne({ $pull: { followers: _id } });
    await currentUser.updateOne({ $pull: { followings: userId } });

    res.status(200).json("Unfollowed successfully");
  } else {
    res.status(400).json("You already unfollowed this account");
  }
});

module.exports = {
  getOneUser,
  getAllUsers,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
};
