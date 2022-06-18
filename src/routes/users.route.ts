import express from 'express'
import User from '../handlers/users'
import validateToken from '../validators/validate-token'
import authorizeUser from '../validators/authorization'

const router = express.Router()

router
    .route('/auth/register')
    .post(User.Register)

router
    .route('/auth/signin')
    .post(User.signIn)

router
    .route('/:id')
    .delete(validateToken, authorizeUser, User.deleteAUser)

router
    .route('/')
    .get(User.getAllUsers)

router
    .route('/resetpassword')
    .put(User.resetPassword)



export default router
