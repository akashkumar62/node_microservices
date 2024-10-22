import bcrypt from "bcrypt";
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

class AuthController {
    static async register(req, res) {
        try {
            const payload = req.body;
            const salt = bcrypt.genSaltSync(10);
            payload.password = bcrypt.hashSync(payload.password, salt);
            // console.log(payload)

            const user = await prisma.user.create({
                data: payload,
            });

            return res.json({ message: "Account Created Successfully", user });
        } catch (error) {
            res
                .status(500)
                .json({ message: "Something went wrong while User creation", error });
        }
    }

    static async login(req, res) {

        try {
            const { email, password } = req.body;
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (user) {
                if (!bcrypt.compareSync(password, user.password)) {
                    return res.status(401).json({ message: "Invalid credentials, try again!" });
                }

                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                }

                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: "5d"
                })

                return res.status(200).json({
                    message: "Logged In Successfully",
                    access_token: `Bearer ${token}`
                })

                //return res.status(200).json({message:"successfully login!",user})

            }
            return res.status(401).json({ message: "Invalid credentials, try again!" });
        } catch (error) {
            return res.status(401).json({message: "Invalid credentials or something went wrong"})
        }




    }

    static async user(req,res){
        const user = req.user
        return res.status(201).json({
            user:user
        })
    }
    
}

export default AuthController;
