const express = require('express');
const cors = require('cors');
require('dotenv').config();

const orderRoutes = require('./routes/orderRoutes');
const itemRoutes = require('./routes/itemRoutes');

const app = express();

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
  
app.use(cors(corsOptions));
app.use(express.json());

app.use('/item', itemRoutes);
app.use('/order', orderRoutes);


app.listen(process.env.PORT, () => {
    console.log("server on");
});