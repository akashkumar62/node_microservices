import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader === null || authHeader === undefined)
        return res.status(402).json({
            status: 402,
            message: "Unauthorized"
        })

    const token = authHeader.split(" ")[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err)
            return res.status(402).json({
                status: 402,
                message: "Unauthorized"
            })

        req.user = payload
        next()

    })

}

export default authMiddleware 