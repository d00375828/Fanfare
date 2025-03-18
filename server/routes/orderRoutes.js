const express = require('express');
const Order = require('../model/Order');

const router = express.Router();

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders); 
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err });
  }
});

// Create new order
router.post('/', async (req, res) => {
  try {
    const { section, seat, item } = req.body;
    
    const newOrder = new Order({
      section,
      seat,
      item,
      status: "Order Placed",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: 'Error creating order', error: err });
  }
});

// Update order
router.put('/accept/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { isAccepted: true, status: "Admin accepted order" },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: 'Error updating order', error: err });
  }
});

router.put('/complete/:id', async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { isCompleted: true, status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: 'Error updating order', error: err });
  }
});

module.exports = router;
