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

router
    .route('/:id/views')
    .get(validateToken, authorizeUser, Transaction.getNumberOfViews)

router
    .route('/:id/totaldeposit')
    .get(validateToken, authorizeUser, Transaction.getTotalDeposit)

router
    .route('/:id/balance')
    .get(validateToken, authorizeUser, Transaction.getBalance)

router
    .route('/:id/totalexpenses')
    .get(validateToken, authorizeUser, Transaction.getTotalExpenses)



export default router
