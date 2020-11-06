const express = require("express");
const router = express.Router();

// Item Model
const Item = require("../models/item");

/**
 * @route   GET /items
 * @desc    Get All Items
 * @access  Public
 */

router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 });
    if (!items) throw Error("No items");

    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * @route   POST /items
 * @desc    Create an item
 * @access  Public
 */

router.post("/", async (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    user: req.body.user,
  });

  try {
    const item = await newItem.save();
    if (!item) throw Error("Something went wrong saving the item");

    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

/**
 * @route   DELETE /items/:id
 * @desc    Delete an item
 * @access  Public
 */

router.delete("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    const removed = await item.remove();
    if (!removed)
      throw Error("Something went wrong while trying to delete the item");

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: "Item not found", success: false });
  }
});

module.exports = router;
