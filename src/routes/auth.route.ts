import express from 'express'
import User from '../handlers/users'

const router = express.Router()

router
    .route('/register')
    .post(User.Register)

router
    .route('/signin')
    .post(User.signIn)

export default router
