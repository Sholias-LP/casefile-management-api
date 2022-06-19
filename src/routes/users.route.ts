import express from 'express'
import User from '../handlers/users'
import validateToken from '../validators/validate-token'
import authorizeUser from '../validators/authorization'

const router = express.Router()

router
    .route('/:id')
    .delete(validateToken, authorizeUser, User.deleteAUser)

router
    .route('/')
    .get(User.getAllUsers)


export default router
