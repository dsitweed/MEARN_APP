import { PostModel } from "../models/Post.js";

//UPDATE AUTHOR OF POST
export const updateAuthorPost = async (req, res) => {
    try {
        const user = req.query.user ? req.query.user : "";
        const body = req.body;
        if (user === body.username && body.newUsername && user){
            const update = await PostModel.updateMany({username: user}, {username: body.newUsername}); 
            res.status(200).json(update);
        } else{
            res.status(401).json({mess:"Failed"});
        }
    } catch (err) { 
        res.status(500).json({error: err});
    }
};

//DELETE POSTS OF 1 AUTHOR
export const deleteAuthorPost = async (req, res) => {
    try {
        const user = req.query.user ? req.query.user : "";
        const body = req.body;
        if (user === body.username && user){
            const deletePost = await PostModel.deleteMany({username: user});
            res.status(200).json(deletePost);
        } else{
            res.status(401).json({mess:"Failed"});
        }
    } catch (err) { 
        res.status(500).json({error: err});
    }
};
