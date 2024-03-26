const { Router } = require("express");

const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");

const crypto = require("crypto");

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ rut: req.body.rut });
    if (!user) {
      return res.json({ error: "Error usuario no encontrado" });
    }
    const hash = crypto
      .pbkdf2Sync(req.body.password, user.salt, 1000, 64, "sha1")
      .toString("hex");
    if (hash != user.hash) {
      return res.json({ error: "Error en la contrasena" });
    }
    res.json({ success: "Login Correcto!", token:createToken(user)});
  } catch (error) {
    res.json({ error: error.message });
  }
});

function createToken(user) {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: user._id,
      rut: user.rut,
      email: user.email,
      name: user.name,
      role: user.role,
      active: user.active,
      phone: user.phone,
      company: user.company,
      warehouses: user.warehouses,
      force_password_update: user.force_password_update,
      exp: parseInt(expiry.getTime() / 1000),
    },
    process.env.JWT_SECRET
  );
}

module.exports = router;
