import { Request, Response, NextFunction } from 'express';
import type { ChatMessages as Model } from "../models/ChatMessages";
import { ChatMessages as Controller } from '../controllers/ChatMessages';
import multer from 'multer';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import { failResponse } from '../scripts/response';
import { Users } from '../controllers/Users';
export const ChatMessages = express.Router();

const storage = multer.diskStorage({
  destination: function (req: Request, _file: Express.Multer.File, cb) {
    const dir = './files/messages/' + req.query.user_sender_id + '/';
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

ChatMessages.get('/', async function (req: Request, res: Response, _next: NextFunction) {
  const response = await Controller.getAll(req.query as unknown as Model);
  return res.status(200).json(response);
});

const filesUpload = upload.single('attachment');
ChatMessages.post('/', async function (req: Request, res: Response, _next: NextFunction) {
  const user_sender_id = (req.query.user_sender_id || '').toString();
  const user_receiver_id = (req.query.user_receiver_id || '').toString();
  if (user_sender_id.length == 0 || user_receiver_id.length == 0) {
    return res.status(200).json(failResponse("Missing Parameters", false));
  }
  const response_1 = await Users.getById(parseInt(user_sender_id));
  if (response_1.status != 200) {
    return res.status(200).json(failResponse("User Sender doesn't exists", false));
  }
  const response_2 = await Users.getById(parseInt(user_receiver_id));
  if (response_2.status != 200) {
    return res.status(200).json(failResponse("User Receiver doesn't exists", false));
  }
  return filesUpload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(200).json(failResponse("Error saving File, Try Again", false));
    } else if (err) {
      return res.status(200).json(failResponse("Server error, Try Again", false));
    }
    let reqObj = {} as {[key:string]: string};
    reqObj["user_sender_id"] = user_sender_id;
    reqObj["user_receiver_id"] = user_receiver_id;
    reqObj["message"] = req.body.message;
    if (req.file) {
      reqObj["attachment_url"] = req.file.path.replace(/\\/g, '/');
    }
    const response = await Controller.create(reqObj);
    return res.status(200).json(response);
  });
});

ChatMessages.get('/:id', async function (req: Request, res: Response, next: NextFunction) {
  const response = await Controller.getById(parseInt(req.params.id));
  return res.status(200).json(response);
});

ChatMessages.delete('/:id', async function (req: Request, res: Response, next: NextFunction) {
  const response = await Controller.deleteById(parseInt(req.params.id));
  return res.status(200).json(response);
});
