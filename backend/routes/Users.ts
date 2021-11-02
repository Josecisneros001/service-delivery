import { Request, Response, NextFunction } from 'express';
import type { Users as Model } from "../models/Users";
import { Users as Controller } from '../controllers/Users';

import express from 'express';
export const Users = express.Router();

Users.get('/', async function (req: Request, res: Response, _next: NextFunction) {
  const response = await Controller.getAll(req.query as unknown as Model);
  return res.status(200).json(response);
});

Users.post('/', async function (req: Request, res: Response, _next: NextFunction) {
  const response = await Controller.create(req.body as unknown as Model);
  return res.status(200).json(response);
});

Users.get('/:id', async function (req: Request, res: Response, next: NextFunction) {
  const response = await Controller.getById(parseInt(req.params.id));
  return res.status(200).json(response);
});

Users.put('/:id', async function (req: Request, res: Response, next: NextFunction) {
  const response = await Controller.update(parseInt(req.params.id), req.body);
  return res.status(200).json(response);
});

Users.delete('/:id', async function (req: Request, res: Response, next: NextFunction) {
  const response = await Controller.deleteById(parseInt(req.params.id));
  return res.status(200).json(response);
});

Users.post('/sign_in', async function (req: Request, res: Response, next: NextFunction) {
  const response = await Controller.handleLogin(req.body);
  return res.status(200).json(response);
});
