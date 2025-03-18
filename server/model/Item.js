const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:1lo03zrXOPdHjG8D@cluster0.bom76.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
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