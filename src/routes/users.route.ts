import express from 'express'
import User from '../handlers/users'

const router = express.Router()

router.post('/register',  User.Register);
router.post('/signin',  User.signIn);
router.get('/',  User.getAllUsers);
router.get('/role',  User.getUsersByRole);


export default router