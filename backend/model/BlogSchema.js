const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "MYNAMEISASHISH";

const blog = new mongoose.Schema({
  userID: {
    type: String,
  },
  publishDate: {
    type: Date,
  },
  publisher: {
    type: String,
  },

  title: {
    type: String,
    // required: true,
  },
  content: {
    type: String,
    // required: true,
  },
  catagory: {
    type: String,
    // required: true,
  },
  imgurl: {
    type: String,
  },
  comments: [
    {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      comment: {
        type: String,
      },
    },
  ],
});

const blogModel = mongoose.model("blog", blog);

module.exports = blogModel;
