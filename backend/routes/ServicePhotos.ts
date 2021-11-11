import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import type { ServicePhotos as Model } from "../models/ServicePhotos";
import { ServicePhotos as Controller } from '../controllers/ServicePhotos';
import { Services } from '../controllers/Services';
import fs from 'fs';
import express from 'express';
import { failResponse } from '../scripts/response';
import { v4 as uuidv4 } from 'uuid';
export const ServicePhotos = express.Router();

const storage = multer.diskStorage({
  destination: function (req: Request, _file: Express.Multer.File, cb) {
    const dir = './files/services/' + req.query.service_id + '/';
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

ServicePhotos.get('/', async function (req: Request, res: Response, _next: NextFunction) {
  const response = await Controller.getAll(req.query as unknown as Model);
  return res.status(200).json(response);
});

const filesUpload = upload.single('photo');
ServicePhotos.post('/', async function (req: Request, res: Response, _next: NextFunction) {
  console.log(req.query.service_id);
  const service_id = (req.query.service_id || '').toString()
  if (service_id.length == 0) {
    return res.status(200).json(failResponse("Missing Parameters", false));
  }
  const response = await Services.getById(parseInt(service_id));
  if (response.status != 200) {
    return res.status(200).json(failResponse("Service doesn't exists", false));
  }
  return filesUpload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(200).json(failResponse("Error saving File, Try Again", false));
    } else if (err) {
      return res.status(200).json(failResponse("Server error, Try Again", false));
    }
    if (!req.file) {
      return res.status(200).json(failResponse("Bad Request, Try Again", false));
    }
    let reqObj = {} as {[key:string]: string};
    reqObj["service_id"] = service_id;
    reqObj["photo_url"] = req.file.path.replace(/\\/g, '/');
    reqObj["description"] = req.body.description;
    const response = await Controller.create(reqObj);
    return res.status(200).json(response);
  });
});

ServicePhotos.get('/:id', async function (req: Request, res: Response, next: NextFunction) {
  const response = await Controller.getById(parseInt(req.params.id));
  return res.status(200).json(response);
});

ServicePhotos.delete('/:id', async function (req: Request, res: Response, next: NextFunction) {
  const response = await Controller.deleteById(parseInt(req.params.id));
  return res.status(200).json(response);
});
