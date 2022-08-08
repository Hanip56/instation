const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc    get personal account info
// @route   GET /api/user/:userId
// @access  PUBLIC
const getPersonalAccount = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: "followings followers",
        select: "_id username profilePicture fullname",
      })
      .populate({
        path: "saved posts",
      });

    res.status(200).json(user);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    get one user
// @route   GET /api/user/:username
// @access  PUBLIC
const getOneUser = asyncHandler(async (req, res) => {
  const username = req.params.username;

  const user = await User.findOne({ username })
    .populate({
      path: "followings followers",
      select: "_id username profilePicture fullname",
    })
    .populate({
      path: "saved posts",
    });

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

    res.status(200).json({
      user: {
        _id: targetUser._id,
        username: targetUser.username,
        profilePicture: targetUser.profilePicture,
      },
      message: "User Followed",
    });
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

    res.status(200).json({
      user: {
        _id: targetUser._id,
        username: targetUser.username,
        profilePicture: targetUser.profilePicture,
      },
      message: "Unfollowed Succesfully",
    });
  } else {
    res.status(400).json("You already unfollowed this account");
  }
});

module.exports = {
  getPersonalAccount,
  getOneUser,
  getAllUsers,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
};
