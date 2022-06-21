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
    .get(Transaction.getAllTransactions)

router
    .route('/:id')
    .get(Transaction.getATransaction)
    .put(validateToken, authorizeUser, Transaction.updateATransaction)
    .delete(validateToken, authorizeUser, Transaction.deleteATransaction)



export default router
