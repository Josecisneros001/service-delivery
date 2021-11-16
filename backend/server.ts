import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { cors } from './middleware/cors';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { Appointments as AppointmentsRouter } from './routes/Appointments';
import { Reviews as ReviewsRouter } from './routes/Reviews';
import { ServiceCategories as ServiceCategoriesRouter } from './routes/ServiceCategories';
import { Services as ServicesRouter } from './routes/Services';
import { ServicePhotos as ServicesPhotosRouter } from './routes/ServicePhotos';
import { Users as UsersRouter } from './routes/Users';
import { WorkHours as WorkHoursRouter } from './routes/WorkHours';

const router = express.Router();

export const app = express();
dotenv.config();

// view engine setup
app.use('/', router);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/appointments', AppointmentsRouter);
app.use('/api/v1/reviews', ReviewsRouter);
app.use('/api/v1/services', ServicesRouter);
app.use('/api/v1/service_photos', ServicesPhotosRouter);
app.use('/api/v1/service_categories', ServiceCategoriesRouter);
app.use('/api/v1/users', UsersRouter);
app.use('/api/v1/work_hours', WorkHoursRouter);
app.use('/files', express.static('files'));

app.use(function (_req: Request, _res: Response, next: NextFunction) {
    next(createError(404));
});

app.use(((err, req: Request, res: Response, _next: NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
}) as ErrorRequestHandler);
