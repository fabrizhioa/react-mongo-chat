const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const question = require('./routes/questions');
const batch = require('./routes/batchs');
const auth = require('./routes/auth');

const app = express();

app.use(bodyParser.json());

app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/api/questions', question);

app.use('/api/batchs', batch);

app.use('/api/auth', auth);

module.exports = app;
