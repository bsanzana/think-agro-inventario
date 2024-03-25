const { Router } = require("express");

const router = require("express").Router();

const User = require("../../models/user.model");

// Traer todos los usuarios
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

// Traer 1 usuario por su id

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  res.json({ user: user });
});

//Editar un usuario

router.put("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndUpdate(userId, req.body);
    res.json(user);
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
