import { Request, Response, NextFunction } from 'express';
import type { ServiceCategories as Model } from "../models/ServiceCategories";
import { ServiceCategories as Controller } from '../controllers/ServiceCategories';
import { jwtAuth } from '../middleware/jwtAuth';

import express from 'express';
export const ServiceCategories = express.Router();

ServiceCategories.use(jwtAuth);
ServiceCategories.get('/', async function (req: Request, res: Response, _next: NextFunction) {
  const response = await Controller.getAll(req.query as unknown as Model);
  return res.status(200).json(response);
});

ServiceCategories.post('/', async function (req: Request, res: Response, _next: NextFunction) {
  const response = await Controller.create(req.body as unknown as Model);
  return res.status(200).json(response);
});

ServiceCategories.get('/:id', async function (req: Request, res: Response, next: NextFunction) {
  const response = await Controller.getById(parseInt(req.params.id));
  return res.status(200).json(response);
});

ServiceCategories.delete('/:id', async function (req: Request, res: Response, next: NextFunction) {
  const response = await Controller.deleteById(parseInt(req.params.id));
  return res.status(200).json(response);
});
