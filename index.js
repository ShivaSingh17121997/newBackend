
const express = require("express");
const { connection } = require("./db");
const bcrypt = require("bcrypt")

const { UserModel } = require("./model/user.model")
const jwt = require("jsonwebtoken")
const { postRouter } = require("./routes/post.routes")
const cors = require("cors")


const app = express();
app.use(cors())

app.use(express.json())
app.use("/employee", postRouter)

//register

app.post("/register", async (req, res) => {
    const { name, email, pass, age } = req.body
    try {
        bcrypt.hash(pass, 8, async (err, hash) => {
            const user = new UserModel({ name, email, pass: hash, age })
            await user.save()
            return res.json({msg:"Registered"})

        })
    } catch (err) {
        console.log(err)
    }
})
//login

app.post("/login", async (req, res) => {
    const { email, pass } = req.body
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            bcrypt.compare(pass, user.pass, function (err, result) {
                if (result) {
                    const token = jwt.sign({ course: "backend" }, "masai");
                    res.json({ "msg": "Login successfull", "token": token })
                } else {
                    res.json({msg:"Wrong Credentials"})
                }
            })

        } else {
            res.json({msg:"Login Failed"})
        }

    } catch (err) {
        res.status(400).json({"msg":"error"})
    }

})
////



app.listen(8080, async () => {
    try {
        await connection
    } catch (err) {
        console.log(err)
    }

    console.log("Running at 8080 Port")
})


// "title":"abablu",
// "body":"afaa",
// "device":"asfaf",
// "noc":3,
// "userID":"dsaa",
// "name":"safas"

// "email":"ram@gmail.com",
// "pass":"ram",
// "name":"ram",
// "age":21

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3Vyc2UiOiJiYWNrZW5kIiwiaWF0IjoxNjkyNTAyMjkzfQ.FXXYhAp7eo0UuTWROP_PyAAs-KOz2nEyKMVU6OFEzx4