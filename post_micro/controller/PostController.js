import prisma from "../config/db.config.js";
import axios from "axios"

 class PostController{
      static async index(req,res){
        try {
            const posts = await prisma.post.findMany({});
            let userIds = [];
        
            // Collect user_ids from the posts
            posts.forEach((item) => {
                userIds.push(item.user_id);
            });
         
            const usersResponse = await axios.post(`${process.env.AUTH_URL}/api/getUsers/`, { userIds });
        
             const users  = {};
             usersResponse.data.map((item)=>{
                 users[item.id]=item;
             })
        
            // // Map posts to include the user data
            // const postWithUsers = posts.map((post) => {
            //     const user = users.find((user) => user.id === post.user_id);
            //     return {
            //         ...post,
            //         user,  // Add the corresponding user data to the post
            //     };
            // });
        
            // // Return the posts with the users combined
            
            let postWithUsers = await Promise.all(
                posts.map((post)=>{
                    const user = users[post.user_id]

                    return {
                        post,
                        user
                    }

                })
            )

             return res.json({ postWithUsers });
        
        } catch (error) {
            console.error('Error fetching posts or user data:', error);
            return res.status(500).json({ error: 'An error occurred' });
        }
        
        
      }

      static async store(req,res){
        try {
            const authUser = req.user
            const {title,content} = req.body
            const post = await prisma.post.create({
                data:{
                    user_id:authUser.id,
                    title,
                    content
                }
            })
            return res.status(201).json({message:"post created successfully",post})
        } catch (error) {
            return res.status(500).json({message:"Something went wrong"}) 
        }  
      }
 }

 export default PostController 