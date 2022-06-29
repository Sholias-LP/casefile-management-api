import express from 'express'
import ResourceCategory from '../handlers/resource'
import validateToken from '../middleware/validate-token'
import authorizeUser from '../middleware/authorization'

const router = express.Router()


router
    .route('/new')
    .post(validateToken, authorizeUser, ResourceCategory.addAResourceCategory)



export default router
