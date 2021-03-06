import 'dotenv/config'
import 'tsconfig-paths/register'
import createError from 'http-errors'
import express, { Request, Response } from 'express'
import { cors } from './middleware/utils'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import helmet from 'helmet';
import './db/mongodb'


import indexRouter from './routes/index.route'
import authRouter from './routes/auth.route'
import usersRouter from './routes/users.route'
import casefilesRouter from './routes/casefile.route'
import transactionsRouter from './routes/transaction.route'
import invalidRouter from './routes/404.route'
import nukeRouter from './routes/nuke.route'
import ResourceCategoryRouter from './routes/resource.route'
import documentationRouter from './routes/documentation.route'
import notificationRouter from './routes/notifications.route'
import { checkUser } from './middleware/validate-token'

const app = express();

app.use(cors)
app.use(helmet());
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.all('*', checkUser)
app.use('/api/v1/api-docs', documentationRouter)
app.use('/', indexRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/casefiles/', casefilesRouter)
app.use('/api/v1/transactions/', transactionsRouter)
app.use('/api/v1/resourcecategory/', ResourceCategoryRouter)
app.use('/api/v1/notifications/', notificationRouter)
app.use('/', invalidRouter)
app.use('/api/v1/deploynuke', nukeRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

export default app;
