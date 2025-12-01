const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Category = require("../models/categoryModel");

// Get all
router.get("/", auth, async (req, res) => {
  const categories = await Category.find({ userId: req.user.id });
  res.json(categories);
});

// Add
router.post("/", auth, async (req, res) => {
  const cat = new Category({
    userId: req.user.id,
    ...req.body,
  });
  await cat.save();
  res.json(cat);
});

// Update
router.put("/:id", auth, async (req, res) => {
  await Category.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Updated" });
});

// Delete
router.delete("/:id", auth, async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
