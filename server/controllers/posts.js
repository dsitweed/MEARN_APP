import { PostModel } from "../models/Post.js";

//'/'
export const createPost = async (req, res) => {
    try {
        // const post = new PostModel({
        //     title: "test", //required
        //     desc: "test",
        //     username: "test"
        // });
        // post.save();
        const newPost = req.body;
        const post = new PostModel(newPost);
        await post.save();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({error: err});
    }
};
//'/:id'
export const getPosts = async (req,res) => {
    try {
        console.log(req.body,req.params);
        if (req.body.postId) {
            
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
};

export const updatePost = async (req, res) => {
    try {
        const updatePost = req.body;
        console.log(updatePost._id);
        const post = await PostModel.findOneAndUpdate({ _id: updatePost._id}, updatePost, {new: true});

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({error: err});
    }
};

export const deletePost = async (req, res) => {
    try {
        const deletePost = req.body;
        const post = await PostModel.deleteOne({ _id: deletePost._id});
    } catch (err){
        res.status(500).json({error: err});
    }
};