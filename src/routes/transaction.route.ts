import express from 'express'
import Transaction from '../handlers/transactions'
import validateToken from '../validators/validate-token'
import authorizeUser from '../validators/authorization'

const router = express.Router()


router.post('/new', validateToken, authorizeUser, Transaction.addATransaction);
router.get('/',  Transaction.getAllTransactions);
router.get('/:id',  Transaction.getATransaction);
router.put('/:id', validateToken, authorizeUser, Transaction.updateATransaction);
router.delete('/:id', validateToken, authorizeUser, Transaction.deleteATransaction);


export default router