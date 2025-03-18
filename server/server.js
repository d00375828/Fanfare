const express = require('express');
const cors = require('cors');

const orderRoutes = require('./routes/orderRoutes');
const itemRoutes = require('./routes/itemRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/item', itemRoutes);
app.use('/order', orderRoutes);


app.listen(8080, () => {
    console.log("server on");
});