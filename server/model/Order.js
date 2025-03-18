const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  dbName: "Fanfare"
}).then(() => console.log('Order base loaded'))
.catch(err => console.error('MongoDB connection error:', err));

// Define User schema
const orderSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true
  },
  seat: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  isAccepted: {
    type: Boolean,
    default: false
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
  }
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;