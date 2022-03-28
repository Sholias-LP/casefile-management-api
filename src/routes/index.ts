import express, { Request, Response} from 'express';

const router = express.Router()

/* GET home page. */
const welcomeRoute = (req: Request, res: Response) => {
  res.status(200).send(
    { 
      status: {
        statusCode: 200,
        statusMessage: "Success"
      },
      message: 'Welcome to the Casefile Management Syetem API'
    })
}

router.get('/',  welcomeRoute);

export default router;
