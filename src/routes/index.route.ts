import express, { Request, Response} from 'express';

const router = express.Router()

/* GET home page. */   
const welcomeRoute = (req: Request, res: Response) => {
  res.status(200).send(
    { 
      success: true,
      message: 'Welcome to the Casefile Management System API'
    })
}

router.get('/',  welcomeRoute);

export default router;