const { Router, json } = require("express");

const router = require("express").Router();

const User = require("../../models/user.model");

const jwt = require("jsonwebtoken");

// Traer todos los usuarios
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    //No logre pasar nunca un objeto por aca, asi que pase el token y lo decodifique
    const tokenDecoded = jwt.verify(req.query.token, process.env.JWT_SECRET);
    const users = await User.find({ company: tokenDecoded.company })
      .skip((page - 1) * limit)
      .limit(limit);
    try {
      const totalUsers = await User.countDocuments({
        company: tokenDecoded.company,
      });
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

//Crear usuario

router.post("/create", async (req, res) => {
  const { user } = req.body;

  try {
    const user = await User.create(req.body);
    res.json({ user: user });
  } catch (error) {
    res.json({ error: error.message });
  }
});

//Crear usuario

router.delete("/delete/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndDelete(userId, req.body);
    res.json({user:user});
  } catch (error) {
    res.json({ error: error.message });
  }
});
module.exports = router;
