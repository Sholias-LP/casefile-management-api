import express from 'express'
import Notification from '../handlers/notifications'
import validateToken from '../middleware/validate-token'
import authorizeUser from '../middleware/authorization'

const router = express.Router()

router
    .route('/')
    .post(validateToken, authorizeUser, Notification.popNotifications)

router
    .route('/:id/read')
    .put(validateToken, authorizeUser, Notification.markAsRead)

router
    .route('/:id/unread')
    .put(validateToken, authorizeUser, Notification.markAsUnread)

export default router
