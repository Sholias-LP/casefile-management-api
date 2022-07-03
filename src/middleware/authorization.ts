import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { getToken } from './utils'

const secret = process.env.SECRET as string
export interface IToken {
    role: string;
}

const authorizeUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = getToken(req)
    try {
        jwt.verify(token, secret, (err, decoded) => {
            if (decoded && (decoded as IToken).role === 'partner' || (decoded as IToken).role === 'associate') {
                next() 
            } else {
                res.status(403).send({ message: 'Forbidden' }) 
            }
        })
    } catch (err) {
        res.send(err)
    }
}

export default authorizeUser
