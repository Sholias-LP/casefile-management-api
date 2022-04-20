import express, { Request, Response } from 'express';

const router = express.Router()

/* GET home page. */
const invalidRoute = (req: Request, res: Response) => {
    res.status(404).send(
        {
            success: false,
            message: 'Invalid Route. Please confirm your endpoint.'
        })
}

router.get('*', invalidRoute);

export default router;
