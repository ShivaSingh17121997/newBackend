

const express = require("express");
const { PostModel } = require("../model/post.model");

const { auth } = require("../middleware/Auth")


const postRouter = express.Router();

// postRouter.use(auth)

// posts data

postRouter.post("/post/add", async (req, res) => {
    try {
        let newpost = new PostModel(req.body);
        await newpost.save();
        res.status(200).json({ msg: "Post added" })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


//get data

postRouter.get("/posts", async (req, res) => {
    try {
        let all = await PostModel.find()
        res.status(200).json({ msg: "All posts", all })


    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


// update data

postRouter.patch("/update/:id", async (req, res) => {
    try {
        const { id } = req.params

        await PostModel.findByIdAndUpdate({ _id: id }, req.body)
        res.status(200).json({ "msg": "the logged in user can update his/her posts", body: req.body })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// delete data 

postRouter.delete("/delete/:id", async (req, res) => {

    try {
        const { id } = req.params

        await PostModel.findByIdAndDelete({ _id: id }, req.body)
        res.status(200).json({ "msg": "deleted", body: req.body })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})







module.exports = { postRouter }

