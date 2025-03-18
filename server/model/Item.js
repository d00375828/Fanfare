const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    dbName: "Fanfare"
}).then(() => console.log('Item base loaded'))
.catch(err => console.error('MongoDB connection error:', err));

// Define User schema
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Item = mongoose.model('item', itemSchema);

module.exports = Item;