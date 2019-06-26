const express = require('express');
const bodyParser = require('body-parser');
const kiwiRouter = require('./kiwi');
const cors = require('cors');

// const requireParams = require('../middlewares/require-params');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(kiwiRouter);

// app.use(requireParams);
module.exports = app;
