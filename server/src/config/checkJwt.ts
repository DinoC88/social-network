import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import keys from './keys';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
	//Get the jwt token from the head
	const bearerHeader = <string>req.headers['authorization'];
	const bearer = bearerHeader.split(' ');
	const token = bearer[1];
	let jwtPayload;
	//Try to validate the token and get data
	try {
		jwtPayload = <any>jwt.verify(token, keys.secretOrKey);
		res.locals.jwtPayload = jwtPayload;
	} catch (error) {
		//If token is not valid, respond with 401 (unauthorized)
		res.status(401).send('Not authorized');
		return;
	}

	//The token is valid for 1 hour
	//We want to send a new token on every request
	const { userId, name } = jwtPayload;
	const newToken = jwt.sign({ userId, name }, keys.secretOrKey, {
		expiresIn: '1h'
	});
	res.setHeader('token', newToken);

	//Call the next middleware or controller
	next();
};
