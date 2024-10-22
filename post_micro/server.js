import express from "express";
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()
const app = express();

const PORT = process.env.PORT || 3001


// ......middleware......
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get("/" , (req,res)=>{
    return res.json({message: "server started Successfully..."})
})


//routes
import Routes from "./routes/index.js"
app.use("/v1",Routes)

app.listen(PORT, ()=>{
    console.log(`Server started on ${PORT}`)
})