import express, { Request, Response} from 'express';

const router = express.Router()

/* GET home page. */
const welcomeRoute = (req: Request, res: Response) => {
  res.status(200).send(
    { 
      status: {
        code: 200,
        message: "Success"
      },
      message: 'Welcome to the Casefile Management Syetem API'
    })
}

router.get('/',  welcomeRoute);

export default router;
