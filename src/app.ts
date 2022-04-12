/* -------------------------------------------------------------------------- */
/*                              External imports                              */
/* -------------------------------------------------------------------------- */

import createError from 'http-errors'
import express, { Request, Response} from 'express';
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs'

/* -------------------------------------------------------------------------- */
/*                              Internal imports                              */
/* -------------------------------------------------------------------------- */

import indexRouter from './routes/index'
import usersRouter from './routes/users.route'
import casefilesRouter from './routes/casefile.route'

const swaggerJsDocs = YAML.load(__dirname + '/spec/api.yaml')
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs))
app.use('/api/v1/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/', casefilesRouter);

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
