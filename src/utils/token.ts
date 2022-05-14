import { Request } from 'express'

export const getToken = (req: Request) => {
  const token = req.headers.authorization
  return token ? token.split(' ')[1] : ''
}
