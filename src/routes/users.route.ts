import express from 'express'
import User from '../handlers/users'
import validateToken from '../validators/validate-token'
import authorizeUser from '../validators/authorization'

const router = express.Router()

router.post('/register',  User.Register);
router.post('/signin',  User.signIn);
router.get('/',  User.getAllUsers);
router.get('/role',  User.getUsersByRole);
router.put('/resetpassword',  User.resetPassword);
router.delete('/:id', validateToken, authorizeUser, User.deleteAUser);


export default router
