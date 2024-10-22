import prisma from "../config/db.config.js"

class UserController {
    static async getUser(req,res){
        const {id} = req.params
        const user = await prisma.user.findUnique({
            where:{
               id:id
            },
            select:{
                id : true,
                name: true,
                email: true
            }
        })
        return res.status(201).json({
          user
        })
    }

    static async getUsers(req,res){

        try {
            const {userIds} = req.body
        const users = await prisma.user.findMany({
            where:{
                id:{
                    in:userIds
                }
            },
            select:{
                id:true,
                name: true,
                email:true,

            }
        })
        return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json({message:"Somethin went wrong while fetching users" ,error})
        }
        
    }
}

export default UserController