const express = require('express');

const routes = require('./routes');
const { ValidationError, NotFoundError } = require('./lib/errors');

const app = express();
const mongoose = require('mongoose');

const mongoConnection = mongoose.createConnection('mongodb://localhost:27017/petsDb', { useNewUrlParser: true, useUnifiedTopology: true });
mongoConnection.on('connected', () => {
    console.log('Connection established to Mongodb');
});
mongoConnection.on('error', err => {
    console.log('Unable to connect to the mongoDB server. Error:' + err);
});
mongoConnection.on('disconnected', () => {
    console.log('Mongodb disconnected');
});

app.use(express.json({ limit: '100kb' }));
app.use('/', routes);
app.use('/', (err, req, res, next) => {
    // default to 500 internal server error unless we've defined a specific error
    let code = 500;
    if (err instanceof ValidationError) {
        code = 400;
    }
    if (err instanceof NotFoundError) {
        code = 404;
    }
    res.status(code).json({
        message: err.message,
    });
});

module.exports = app;