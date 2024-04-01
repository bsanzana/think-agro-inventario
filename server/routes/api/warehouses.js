const { Router } = require("express");

const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Warehouses = require("../../models/warehouse.model");

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const tokenDecoded = jwt.verify(req.query.token, process.env.JWT_SECRET);
    const warehouses = await Warehouses.find({ company: tokenDecoded.company })
      .skip((page - 1) * limit)
      .limit(limit);
    try {
      const totalWarehouses = await Warehouses.countDocuments({
        company: tokenDecoded.company,
      });
      const totalPages = Math.ceil(totalWarehouses / limit);
      res.json({
        warehouses: warehouses,
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

router.get("/:warehouseId", async (req, res) => {
  const { warehouseId } = req.params;
  const warehouse = await Warehouses.findById(warehouseId);
  res.json({warehouse:warehouse});
});

//Consultar por las bodegas encargadas por un usuario ID
router.get("/managers/:userId", async (req, res) => {
  const { userId } = req.params;
  const managers = await Warehouses.find({ managers: userId });
  res.json({ managers: managers });
});


//Crear bodega

router.post("/create", async (req, res) => {
  const { warehouse } = req.body;

  try {
    const warehouse = await Warehouses.create(warehouse);
    res.json({ warehouse: warehouse });
  } catch (error) {
    res.json({ error: error.message });
  }
});

//Actualizar 
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
