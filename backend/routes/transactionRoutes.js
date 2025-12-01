// backend/routes/transactionRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Transaction = require("../models/transactions");

// GET all transactions for logged-in user (sorted newest first)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const data = await Transaction.find({ userId: req.user.id }).sort({
      date: -1,
    });
    res.json(data);
  } catch (error) {
    console.error("GET /transactions error:", error);
    res.status(500).json({ message: "Failed to load transactions" });
  }
});

// CREATE a transaction
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newTx = new Transaction({
      userId: req.user.id,
      ...req.body,
    });

    await newTx.save();
    res.json({ message: "Transaction added", newTx });
  } catch (error) {
    console.error("POST /transactions error:", error);
    res.status(500).json({ message: "Failed to add transaction" });
  }
});

// UPDATE a transaction (only if belongs to user)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Transaction not found" });

    res.json({ message: "Transaction updated", updated });
  } catch (error) {
    console.error("PUT /transactions/:id error:", error);
    res.status(500).json({ message: "Update failed" });
  }
});

// DELETE a transaction (only if belongs to user)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted)
      return res.status(404).json({ message: "Transaction not found" });

    res.json({ message: "Transaction deleted" });
  } catch (error) {
    console.error("DELETE /transactions/:id error:", error);
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
