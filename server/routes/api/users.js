const { Router } = require("express");

const router = require("express").Router();

const User = require("../../models/user.model");

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(limit);
    try {
      const totalUsers = await User.countDocuments();
      const totalPages = Math.ceil(totalUsers / limit);
      res.json({
        users: users,
        currentPage: page,
        totalPages,
      });
    } catch (error) {
      res.json({ error: error.message });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});





router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  res.json(user);
});

module.exports = router;
