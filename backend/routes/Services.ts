import { Request, Response, NextFunction } from 'express';
import type { Services as Model } from "../models/Services";
import { Services as Controller } from '../controllers/Services';
import { jwtAuth } from '../middleware/jwtAuth';

import express from 'express';
export const Services = express.Router();

Services.use(jwtAuth);
Services.get('/', async function (req: Request, res: Response, _next: NextFunction) {
  const response = await Controller.getAll(req.query as unknown as Model);
  return res.status(200).json(response);
});

Services.post('/', async function (req: Request, res: Response, _next: NextFunction) {
  const response = await Controller.create(req.body as unknown as Model);
  return res.status(200).json(response);
});

Services.get('/:id', async function (req: Request, res: Response, next: NextFunction) {
  const response = await Controller.getById(parseInt(req.params.id));
  return res.status(200).json(response);
});

Services.delete('/:id', async function (req: Request, res: Response, next: NextFunction) {
  const response = await Controller.deleteById(parseInt(req.params.id));
  return res.status(200).json(response);
});

Services.put('/:id', async function (req: Request, res: Response, next: NextFunction) {
  const response = await Controller.update(parseInt(req.params.id), req.body);
  return res.status(200).json(response);
});
