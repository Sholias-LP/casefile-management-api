import express from 'express'
import User from '../handlers/users'
import validateToken from '../middleware/validate-token'
import authorizeUser from '../middleware/authorization'

const router = express.Router()

router
    .route('/:id')
    .delete(validateToken, authorizeUser, User.deleteAUser)

router
    .route('/')
    .get(User.getAllUsers)

router
    .route('/:id/resources')
    .get(validateToken, authorizeUser, User.getAllResourcesByAUser)


export default router
