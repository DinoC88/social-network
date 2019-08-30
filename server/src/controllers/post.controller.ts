import { Request, Response } from 'express';

//validation
import validatePostInput from '../validation/post';
// DB
import { connect } from '../database';
// Interfaces
import { IPost } from '../interface/IPost.interface';

export async function getPosts(req: Request, res: Response): Promise<Response | void> {
	try {
		const conn = await connect();
		const posts = await conn.query('SELECT * FROM posts');
		return res.json(posts[0]);
	} catch (e) {
		console.log(e);
	}
}

export async function createPost(req: Request, res: Response) {
	const { errors, isValid } = validatePostInput(req.body);

	//check validation
	if (!isValid) {
		//if error exist
		return res.status(400).json(errors);
	}
	const newPost: IPost = {
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar,
		userid: res.locals.jwtPayload.id
	};
	const conn = await connect();
	await conn.query('INSERT INTO posts SET ?', [ newPost ]);
	res.json({
		message: 'New Post Created'
	});
}
//@route  Delete api/posts/:id
//@desc   Delete post
//@access Private
export async function deletePost(req: Request, res: Response) {
	const id: number = req.params.id;
	const userid: number = res.locals.jwtPayload.id;
	const conn = await connect();
	await conn.query('DELETE FROM posts WHERE id = ? and userid = ?', [ id, userid ]);
	res.json({
		message: 'Post deleted'
	});
}
