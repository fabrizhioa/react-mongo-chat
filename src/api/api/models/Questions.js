const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Questions = mongoose.model(
    'question',
    new Schema({
        title: String,
        options: [String, String, String, String],
        correctAnswer: String,
        batch_id: String,
    })
);

module.exports = Questions;
