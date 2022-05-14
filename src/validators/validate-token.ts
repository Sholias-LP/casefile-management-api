import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { getToken } from '../utils/token'

const secret = process.env.SECRET as string

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = getToken(req)

  // eslint-disable-next-line consistent-return
  jwt.verify(token, secret, (err) => {
    if (err) {
      return res.status(401).send({
        message: 'Access is Denied'
      })
    }
  })
  next()
}

export default validateToken
