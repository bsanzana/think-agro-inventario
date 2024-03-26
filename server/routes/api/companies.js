const { Router } = require("express");

const router = require("express").Router();

const Company = require("../../models/company.model");

router.get("/", async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const company = await Company.find()
        .skip((page - 1) * limit)
        .limit(limit);
      try {
        const Company = await Company.countDocuments();
        const totalPages = Math.ceil(Company / limit);
        res.json({
            company: company,
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
  
  router.get("/:companyId", async (req, res) => {
    const { companyId } = req.params;
    const company = await Company.findById(companyId);
    res.json(company);
  });
module.exports = router;