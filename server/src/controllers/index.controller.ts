import { Request, Response } from 'express';

export function indexWelcome(req: Request, res: Response): Response {
  return res.json('Welcome to Typescript-node-mysql');
}
