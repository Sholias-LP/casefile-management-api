import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { getToken } from '../utils/token'

const secret = process.env.SECRET as string
export interface IToken {
    role: string;
}

// middleware for doing role-based permissions
const authorizeUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = getToken(req)
    try {
        jwt.verify(token, secret, (err, decoded) => {
            if (decoded && (decoded as IToken).role === 'partner' || (decoded as IToken).role === 'associate') {
                next() // role is allowed, so continue on the next middleware
            } else {
                res.status(403).send({ message: 'Forbidden' }) // user is forbidden
            }
        })
    } catch (err) {// err 

    }
}

export default authorizeUser
