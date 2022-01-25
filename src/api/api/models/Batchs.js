const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Batchs = mongoose.model(
    'batchs',
    new Schema({
        title: String,
        prizeTotal: Number,
    })
);

module.exports = Batchs;
