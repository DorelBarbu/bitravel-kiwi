const express = require('express');
const bodyParser = require('body-parser');
// const requireParams = require('../middlewares/require-params');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(requireParams);
module.exports = app;
