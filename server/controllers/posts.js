import { PostModel } from "../models/Post.js";

//'/'
export const createPost = async (req, res) => {
    try {
        // const post = new PostModel({
            // title: "test", //required
            // desc: "test",
            // username: "test"
        // });
        // post.save();
        const newPost = req.body;
        console.log("in",newPost);
        const post = new PostModel(newPost);
        await post.save();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({error: err});
    }
};
//UPDATE BY ID of post
//'/:id'
export const updatePost = async (req, res) => {
    try {
        const idPost = req.params.id;
        const post = await PostModel.findOne({_id: idPost});
        if (post.username === req.body.username){
            const updatePost = await PostModel.findOneAndUpdate({_id: idPost}, 
                req.body, {new:true});
            res.status(200).json(updatePost);
        } else{
            res.status(401).json({mess:"You just can update your post!"});
        }

    } catch (err) {
        res.status(500).json({error: err});
    }
};
//UPDATE AUTHOR OF POST
export const updateAuthorPost = async (req, res) => {
    try {
        const user = req.query.user ? req.query.user : "";
        const body = req.body;
        if (user === body.username && body.newUsername && user){
            const update = await PostModel.updateMany({username: user}, {username: body.newUsername}); 
            res.status(200).json(update);
        }
    } catch (err) { 
        res.status(500).json({error: err});
    }
};
//DELETE BY ID of post
//'/:id'
export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await PostModel.findOne({_id: postId});
        if (req.body.username === post.username){
            const deletePost = await PostModel.findOneAndDelete({_id: postId});
            res.status(200).json({mess:"deleted", deletePost: deletePost});
        } else{
            res.status(401).json({mess:"You just can delete your post!"});
        }
    } catch (err){
        res.status(500).json({error: err});
    }
};

//DELETE POSTS OF 1 AUTHOR
export const deleteAuthorPost = async (req, res) => {
    
};

//'/:id' id of post
export const getPost = async (req,res) => {
    try {
        const id = req.params.id;
        const post = await PostModel.findOne({_id: id});
        // console.log(post);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({error: err});
    }
};

//'/?user=' get all post
export const getAllPosts = async (req,res) => {
    try {
        const username = req.query.user;
        const catName = req.query.cat;//cat = category
        var posts;
        if (username){
            posts = await PostModel.find({username:username});
        } else if (catName){
            posts= await PostModel.find({categories: {
                $in:[catName]//neu chua catName
                },
            })
        } else{
            posts = await PostModel.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({error: err});
    }
};