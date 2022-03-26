import express from 'express';
import { deleteAuthorPost, updateAuthorPost } from '../controllers/authorPost.js';

const router = express.Router();

//use query ?user=
router.put('/', updateAuthorPost);

router.delete('/', deleteAuthorPost);

export default router;