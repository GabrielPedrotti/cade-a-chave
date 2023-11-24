const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config({ path: './environments/.env' });

const routes = require('./routers/routes');

const app = express();
const port = process.env.PORT;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.use(express.json());
app.use(cors(), routes);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;