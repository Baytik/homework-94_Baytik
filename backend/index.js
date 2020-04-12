const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const users = require('./app/users');
const config = require('./config');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);
    app.use('/users', users);
    app.listen(port)
};

run().catch(e => {
    console.error(e)
});
