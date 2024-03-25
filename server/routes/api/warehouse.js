const { Router } = require("express");

const router = require("express").Router();

const Warehouses = require("../../models/warehouse.model");

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const warehouses = await Warehouses.find()
      .skip((page - 1) * limit)
      .limit(limit);
    try {
      const totalWarehouses = await Warehouses.countDocuments();
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
  const warehouse = await Warehouses.findById(warehouseIdrId);
  res.json(warehouse);
});
module.exports = router;
