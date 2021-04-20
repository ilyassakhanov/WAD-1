const mongoose = require('mongoose');


const userScema = new mongoose.Schema({

    realName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userScema);