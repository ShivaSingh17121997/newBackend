const jwt = require("jsonwebtoken")


const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        let decoded = jwt.verify(token, process.env.key);
        if (decoded) {
            next()
        } else {
            res.status(200)
        }

    } catch (error) {
        res.status(200).json({msg:"Please Login"})
    }
}

module.exports = { auth }