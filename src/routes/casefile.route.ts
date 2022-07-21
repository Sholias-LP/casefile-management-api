import express from 'express'
import Casefile from '../handlers/casefiles'
import validateToken, { checkUser } from '../middleware/validate-token'
import authorizeUser from '../middleware/authorization'

const router = express.Router()


router
    .route('/new')
    .post(validateToken, authorizeUser, Casefile.addACasefile)

router
    .route('/')
    .get(validateToken, authorizeUser, Casefile.getAllCasefiles)

router
    .route('/:id')
    .get(validateToken, authorizeUser, Casefile.getACasefile)
    .put(validateToken, authorizeUser, Casefile.updateACasefile)
    .delete(validateToken, authorizeUser, Casefile.deleteACasefile)

router
    .route('/:id/cerca')
    .post(validateToken, authorizeUser, Casefile.closeACasefile)

router
    .route('/:id/views')
    .get(validateToken, authorizeUser, Casefile.getNumberOfViews)

router
    .route('/:id/totaldeposit')
    .get(validateToken, authorizeUser, Casefile.getTotalDeposit)

router
    .route('/:id/balance')
    .get(validateToken, authorizeUser, Casefile.getBalance)

router
    .route('/:id/totalexpenses')
    .get(validateToken, authorizeUser, Casefile.getTotalExpenses)


export default router
