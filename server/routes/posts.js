import express from "express";
import { createPost, deleteAuthorPost, deletePost, getAllPosts, getPost, updateAuthorPost, updatePost } from "../controllers/posts.js";

const router = express.Router();

router.get('/', getAllPosts);

router.get('/:id', getPost);

router.post('/', createPost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

export default router;
