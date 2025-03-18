const express = require('express');
const Item = require('../model/Item');

const router = express.Router();

// GET all Items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items); 
  } catch (err) {
    res.status(500).json({ message: 'Error fetching Items', error: err });
  }
});

// Create new Item
router.post('/', async (req, res) => {
    try {
        const { name, quantity, description } = req.body;
        const newItem = new Item({
            name,
            quantity,
            description,
        });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: 'Error creating Item', error: err });
    }
});

router.put('/:id', async (req, res) => {
    const { quantity } = req.body;
    const { id } = req.params;
  
    try {
      const updatedItem = await Item.findByIdAndUpdate(
        id,
        { quantity },
        { new: true }
      );
  
      if (!updatedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      res.status(200).json(updatedItem);
    } catch (err) {
      res.status(400).json({ message: 'Error updating Item', error: err });
    }
});

router.put('/update/:id', async (req, res) => {
  const { name, quantity, description } = req.body;
  const { id } = req.params;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, quantity, description },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: 'Error updating Item', error: err });
  }
});

// Delete an Item
router.delete('/:id', async (req, res) => {
    const { id } = req.params; // Get the item ID from the URL parameter
  
    try {
      const deletedItem = await Item.findByIdAndDelete(id); // Use Mongoose's findByIdAndDelete method
  
      if (!deletedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      res.status(200).json({ message: 'Item deleted successfully', deletedItem });
    } catch (err) {
      res.status(400).json({ message: 'Error deleting Item', error: err });
    }
});

module.exports = router;