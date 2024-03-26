const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.json({ error: "No hay token" });
  }
  const token = req.headers["authorization"];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.json({ error: "Token incorrecto" });
  }
  next();
};

module.exports = checkToken;
