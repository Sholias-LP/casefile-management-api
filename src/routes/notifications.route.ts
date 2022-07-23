import express from 'express'
import Notification from '../handlers/notifications'
import validateToken from '../middleware/validate-token'
import authorizeUser from '../middleware/authorization'

const router = express.Router()

router
    .route('/')
    .get(validateToken, authorizeUser, Notification.popNotifications)


router
    .route('/read')
    .patch(validateToken, authorizeUser, Notification.bulkMarkAsRead)

router
    .route('/unread')
    .patch(validateToken, authorizeUser, Notification.bulkMarkAsUnread)


router
    .route('/delete')
    .delete(validateToken, authorizeUser, Notification.bulkDelete)

export default router
