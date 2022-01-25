const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = mongoose.model(
    'User',
    new Schema({
        email: String,
        name: String,
        password: String,
        salt: String,
        role: { type: String, default: 'user' },
        points: { type: Number, default: 0 },
        excludeBatchs: { type: Array, default: [] },
    })
);

module.exports = Users;
