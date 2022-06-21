import express from 'express'
import Casefile from '../handlers/casefiles'
import validateToken, { checkUser } from '../middleware/validate-token'
import authorizeUser from '../middleware/authorization'

const router = express.Router()


router
    .route('/casefiles/new')
    .post(validateToken, authorizeUser, checkUser, Casefile.addACasefile)

router
    .route('/casefiles/')
    .get(Casefile.getAllCasefiles)

router
    .route('/casefiles/:id')
    .get(Casefile.getACasefile)
    .put(validateToken, authorizeUser, Casefile.updateACasefile)
    .delete(validateToken, authorizeUser, Casefile.deleteACasefile)

export default router
