import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import type { Users as Model } from "../models/Users";
import { Users as Controller } from '../controllers/Users';
import fs from 'fs';
import dotenv from 'dotenv';
import { failResponse } from '../scripts/response';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { jwtAuth } from '../middleware/jwtAuth';

import express from 'express';
export const Users = express.Router();

dotenv.config();

const storage = multer.diskStorage({
  destination: function (req: Request, _file: Express.Multer.File, cb) {
    const dir = './files/users/' + req.params.id + '/';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    const extension = file.originalname.split('.').pop();
    cb(null, uuidv4() + '.' + extension);
  }
})
const upload = multer({ storage: storage });

Users.get('/', jwtAuth, async function (req: Request, res: Response, _next: NextFunction) {
  const response = await Controller.getAll(req.query as unknown as Model);
  return res.status(200).json(response);
});

Users.post('/', async function (req: Request, res: Response, _next: NextFunction) {
  const response = await Controller.create(req.body as unknown as Model);
  return res.status(200).json(response);
});

Users.get('/:id', jwtAuth, async function (req: Request, res: Response, next: NextFunction) {
  const response = await Controller.getById(parseInt(req.params.id));
  return res.status(200).json(response);
});

const filesUpload = upload.fields([{ name: 'profile_picture', maxCount: 1 }, { name: 'file_id', maxCount: 1 }, { name: 'file_proof_of_address', maxCount: 1 }]);
Users.post('/files/:id', jwtAuth, async function (req: Request, res: Response, next: NextFunction) {
  const response = await Controller.getById(parseInt(req.params.id));
  if (response.status != 200) {
    return res.status(200).json(failResponse("User doesn't exists", false));
  }
  const currentUser = response.data;
  return filesUpload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(200).json(failResponse("Error saving File, Try Again", false));
    } else if (err) {
      return res.status(200).json(failResponse("Server error, Try Again", false));
    }
    if (typeof req.files !== 'object') {
      return res.status(200).json(failResponse("Bad Request, Try Again", false));
    }
    let filesObj = {} as {[key:string]: string};
    const files = req.files as {[fieldname: string]: Express.Multer.File[];};
    for (const fileName in files) {
      if (currentUser[fileName].length > 4) {
        fs.stat(currentUser[fileName], function (err, stats) {
          if(err) return;
          fs.unlink(currentUser[fileName], function(err){
              if(err) return;
          });  
        });
      }
      filesObj[fileName] = files[fileName][0].path.replace(/\\/g, '/');
    }
    const response = await Controller.update(parseInt(req.params.id), filesObj);
    return res.status(200).json(response);
  });
});

Users.put('/:id', jwtAuth, async function (req: Request, res: Response, next: NextFunction) {
  const response = await Controller.update(parseInt(req.params.id), req.body);
  return res.status(200).json(response);
});

Users.delete('/:id', jwtAuth, async function (req: Request, res: Response, next: NextFunction) {
  const response = await Controller.deleteById(parseInt(req.params.id));
  return res.status(200).json(response);
});

Users.post('/sign_in', async function (req: Request, res: Response, next: NextFunction) {
  const response = await Controller.handleLogin(req.body);
  if(response.data) {
    const payload = { check: true };
    const JWT_HASH = process.env.JWT_HASH || '';
    const token = jwt.sign(payload, JWT_HASH);
    response.data.token = token;
  }
  return res.status(200).json(response);
});
