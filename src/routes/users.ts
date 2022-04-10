import express from 'express'
import User from '../handlers/users'

const router = express.Router()

// Register a user
router.post('/register',  User.Register);


export default router