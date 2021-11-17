import { Request, Response, NextFunction } from 'express';
import type { Appointments as Model } from "../models/Appointments";
import { Appointments as Controller } from '../controllers/Appointments';
import { jwtAuth } from '../middleware/jwtAuth';

import express from 'express';
export const Appointments = express.Router();

Appointments.use(jwtAuth);
Appointments.get('/', async function (req: Request, res: Response, _next: NextFunction) {
  const response = await Controller.getAll(req.query as unknown as Model);
  return res.status(200).json(response);
});

Appointments.post('/', async function (req: Request, res: Response, _next: NextFunction) {
  const response = await Controller.create(req.body as unknown as Model);
  return res.status(200).json(response);
});

Appointments.get('/:id', async function (req: Request, res: Response, next: NextFunction) {
  const response = await Controller.getById(parseInt(req.params.id));
  return res.status(200).json(response);
});

Appointments.delete('/:id', async function (req: Request, res: Response, next: NextFunction) {
  const response = await Controller.deleteById(parseInt(req.params.id));
  return res.status(200).json(response);
});
