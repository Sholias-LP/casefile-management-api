import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { getToken } from './utils'
import { ObjectId } from 'mongoose'
import userModel from '../models/user/user.model'


const secret = process.env.SECRET as string

export interface IDecodedToken {
  id: ObjectId;
  email: string;
  first_name: string;
  currentUser: any
}

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = getToken(req)

  // eslint-disable-next-line consistent-return
  jwt.verify(token, secret, (err, decodedToken) => {
    console.log(decodedToken)
    if (err) {
      return res.status(401).send({
        message: 'Access is Denied'
      })
    }    
  })
  next()
}


// Check Current User
export const checkUser = (req: Request, res: Response, next: NextFunction) => {
  const token = getToken(req)
      
  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null
        return res.status(401).send({
          message: 'Access Denied [--flag *fromcheckUser]'
        })
      } else {
        const user = await userModel.findById((decodedToken as IDecodedToken).id)
        res.locals.user = user
        next()
      }
    })
  } else {
    res.locals.user = null
    next()
  }
  
}

export default validateToken
