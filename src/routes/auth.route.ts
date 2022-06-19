import express from 'express'
import User from '../handlers/users'
import validateToken from '../validators/validate-token'
import authorizeUser from '../validators/authorization'

const router = express.Router()

router
    .route('/register')
    .post(User.Register)

router
    .route('/signin')
    .post(User.signIn)


router
    .route('/resetpassword')
    .put(validateToken, authorizeUser, User.resetPassword)


export default router
