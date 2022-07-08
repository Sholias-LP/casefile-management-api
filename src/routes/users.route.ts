import express from 'express'
import User from '../handlers/users'
import validateToken from '../middleware/validate-token'
import authorizeUser from '../middleware/authorization'

const router = express.Router()

router
    .route('/:id')
    .get(validateToken, authorizeUser, User.getAUser)
    .put(validateToken, authorizeUser, User.updateAUser)
    .delete(validateToken, authorizeUser, User.deleteAUser)

router
    .route('/')
    .get(validateToken, authorizeUser, User.getAllUsers)

router
    .route('/:id/resources')
    .get(validateToken, authorizeUser, User.getAllResourcesByAUser)


export default router
