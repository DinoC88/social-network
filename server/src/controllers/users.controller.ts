import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as mysql from 'mysql2';
import keys from '../config/keys';

//Validation
import validateRegisterInput from '../validation/register';
import validateLoginInput from '../validation/login';
// DB
import { connect } from '../database';
// Interfaces
import { IUsers } from '../interface/IUsers.interface';

//test user function
export async function testUserRoute(_req: Request, res: Response): Promise<Response | void> {
	res.json('User testing');
}

//register user function
export async function registerUser(req: Request, res: Response): Promise<Response | void> {
	const { errors, isValid } = validateRegisterInput(req.body);
	//Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	try {
		const newUser: IUsers = {
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			avatar: 'https://yogasantosha.ca/wp-content/uploads/2018/09/Neutral-placeholder-profile.jpg'
		};
		bcrypt.genSalt(10, (_err: any, salt: any) => {
			bcrypt.hash(newUser.password, salt, (err: any, hash: string) => {
				if (err) throw err;
				newUser.password = hash;
			});
		});
		const conn = await connect();
		await conn.query('INSERT INTO users SET ?', [ newUser ]);
		res.json('User created');
	} catch (e) {
		res.json('Email already taken');
		console.log(e);
	}
}

//login user function
//@route POST api/users/login
//@desc Login user
//@access Public
export async function loginUser(req: Request, res: Response): Promise<Response | void> {
	const { errors, isValid } = validateLoginInput(req.body);
	//Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const email: string = req.body.email;
	const password: string = req.body.password;
	const conn = await connect();
	await conn.query(`Select * from users where email=` + mysql.escape(email), (err: Error, user: any) => {
		if (user[0] === undefined) {
			res.json({ error: 'User not found' });
		} else {
			bcrypt.compare(password, user[0].password, (err, passCheck) => {
				if (passCheck) {
					//User matched
					//Create JWT Payload
					const payload = { id: user[0].id, name: user[0].name, avatar: user[0].avatar };
					//Sign token
					jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
						res.json({
							success: true,
							token: 'Bearer ' + token
						});
					});
				} else {
					errors.password = 'Password incorrect';
					return res.status(400).json(errors);
				}
			});
		}
	});
}

export async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
	const userid = res.locals.jwtPayload.id;
	console.log(userid);
	const conn = await connect();
	await conn.query('DELETE FROM users WHERE id =' + mysql.escape(userid), (err: Error, result: any) => {
		res.json({ msg: 'User deleted' });
	});
}
