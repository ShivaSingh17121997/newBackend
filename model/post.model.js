
const mongoose = require("mongoose")

const { Schema, model } = require("mongoose");

const postSchema = Schema({
    title: String,
    body: String,
    device: String,
    noc: Number,
    userID: String,
    name: String

})
const PostModel =  model("post", postSchema)

module.exports = { PostModel };