import { Request, Response, NextFunction } from 'express';
import type { WorkHours as Model , WorkHoursMultiple as ModelMultiple } from "../models/WorkHours";
import { WorkHours as Controller } from '../controllers/WorkHours';

import express from 'express';
export const WorkHours = express.Router();

WorkHours.get('/', async function (req: Request, res: Response, _next: NextFunction) {
  const response = await Controller.getAll(req.query as unknown as Model);
  return res.status(200).json(response);
});

WorkHours.post('/', async function (req: Request, res: Response, _next: NextFunction) {
  const response = await Controller.create(req.body as unknown as Model);
  return res.status(200).json(response);
});

WorkHours.post('/multiple/', async function (req: Request, res: Response, _next: NextFunction) {
  const response = await Controller.createMultiple(req.body as unknown as ModelMultiple);
  return res.status(200).json(response);
});

WorkHours.get('/:id', async function (req: Request, res: Response, _next: NextFunction) {
  const response = await Controller.getById(parseInt(req.params.id));
  return res.status(200).json(response);
});

WorkHours.delete('/:id', async function (req: Request, res: Response, _next: NextFunction) {
  const response = await Controller.deleteById(parseInt(req.params.id));
  return res.status(200).json(response);
});
