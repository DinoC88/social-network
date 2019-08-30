import { Router } from 'express';
import { getPosts, createPost, deletePost } from '../controllers/post.controller';
import { checkJwt } from '../config/checkJwt';

const router = Router();

router.route('/').get(getPosts).post(checkJwt, createPost);

router.route('/:id').delete(checkJwt, deletePost);

export default router;
