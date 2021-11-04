import { Request, Response, NextFunction } from 'express';
import type { Multer } from 'multer';
import multer from 'multer';
import type { Users as Model } from "../models/Users";
import { Users as Controller } from '../controllers/Users';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    const dir = './files/' + req.params.id + '/';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '.' + extension);
  }
})
const upload = multer({ storage: storage });

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

const filesUpload = upload.fields([{ name: 'profile_picture', maxCount: 1 }, { name: 'file_id', maxCount: 1 }, { name: 'file_proof_of_address', maxCount: 1 }]);
Users.post('/files/:id', async function (req: Request, res: Response, next: NextFunction) {
  // const response = await Controller.update(parseInt(req.params.id), {
    
  // });
  filesUpload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }
    // Everything went fine.
  })
  return res.status(200).json({});
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
