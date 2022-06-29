import express from 'express'
import User from '../handlers/users'
import validateToken from '../middleware/validate-token'
import authorizeUser from '../middleware/authorization'

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


    router
    .route('/forgotpassword')
    .put(User.forgotPassword)


export default router
