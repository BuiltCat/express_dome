const mongoose = require('mongoose');

module.exports = {
    userSchema: mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    }),
    pageSchema: mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        page: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    })
}