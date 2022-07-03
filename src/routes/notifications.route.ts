import express from 'express'
import Notification from '../handlers/notifications'
import validateToken from '../middleware/validate-token'
import authorizeUser from '../middleware/authorization'

const router = express.Router()

router
    .route('/')
    .post(validateToken, authorizeUser, Notification.popNotifications)

export default router
