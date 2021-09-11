import { Request, Response, NextFunction } from 'express';
import { failResponse, successReponse } from  '../scripts/response';
import { dummyModel } from '../models/dummyModel';

import express from 'express';
export const dummyRouter = express.Router();

dummyRouter.get('/', async function (req: Request, res: Response, next: NextFunction) {
  // req.query
  const response = await dummyModel.getAll();
  return res.status(200).json(response);
});

dummyRouter.post('/', async function (req: Request, res: Response, next: NextFunction) {
  // req.body
  const response = await dummyModel.create();
  return res.status(200).json(response);
});

dummyRouter.get('/:id', async function (req: Request, res: Response, next: NextFunction) {
  const response = await dummyModel.getById(parseInt(req.params.id));
  return res.status(200).json(response);
});

dummyRouter.delete('/:id', async function (req: Request, res: Response, next: NextFunction) {
  const response = await dummyModel.deleteById(parseInt(req.params.id));
  return res.status(200).json(response);
});
