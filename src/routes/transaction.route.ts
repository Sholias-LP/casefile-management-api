import express from 'express'
import Transaction from '../handlers/transactions'
import validateToken from '../middleware/validate-token'
import authorizeUser from '../middleware/authorization'

const router = express.Router()


router
    .route('/new')
    .post(validateToken, authorizeUser, Transaction.addATransaction)

router
    .route('/')
    .get(validateToken, authorizeUser, Transaction.getAllTransactions)

router
    .route('/:id')
    .get(validateToken, authorizeUser, Transaction.getATransaction)
    .put(validateToken, authorizeUser, Transaction.updateATransaction)
    .delete(validateToken, authorizeUser, Transaction.deleteATransaction)

router
    .route('/:id/cerca')
    .post(validateToken, authorizeUser, Transaction.closeATtransaction)

export default router
