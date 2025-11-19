const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Transaction = require("../models/transactions");

// GET ALL TRANSACTIONS OF LOGGED USER
router.get("/", authMiddleware, async (req, res) => {
  try {
    const data = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to load transactions" });
  }
});

// ADD TRANSACTION
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newTx = new Transaction({
      userId: req.user.id,
      ...req.body
    });

    await newTx.save();
    res.json({ message: "Transaction added", newTx });
  } catch (error) {
    res.status(500).json({ message: "Failed to add transaction" });
  }
});

module.exports = router;
