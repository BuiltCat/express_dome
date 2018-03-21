const mongoose = require("mongoose");

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
    bilibiliID: {
      type: String
    },
    title: {
      type: String,
      required: true
    },
    article: {
      type: String,
      required: true
    },
    tags: {
      type: String
    },
    date: {
      type: String,
      default: new Date().valueOf()
    }
  })
};
