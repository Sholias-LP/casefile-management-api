import { Request, Response } from 'express'
import { BaseHandler } from '../interfaces/handler'
import models from '../models/index.js'
import { v4 as uuidv4 } from 'uuid';

const TransactionsModel = models.Transaction

class Transactions extends BaseHandler {

    // Add a new Transaction
    static addATransaction(req: Request, res: Response) {
        TransactionsModel.create({
            id: req.body.id,
            transaction_id: `SHO_${uuidv4()}`,
            transaction_type: req.body.transaction_type,
            client: req.body.client,
            gender: req.body.gender,
            occupation: req.body.occupation,
            transaction_summary: req.body.transaction_summary,
            cost: req.body.cost
        })
            .then((newTransaction) => {
                return res
                    .status(201)
                    .send({
                        success: true,
                        message: 'Transaction added successfully',
                        data: newTransaction
                    })
            })
            .catch((err) => console.log(err))
    }


    // Get all transactions
    static getAllTransactions(req: Request, res: Response) {
        TransactionsModel.findAll().then((transactions) => {
            return res.status(200).send({
                success: true,
                message: 'Transactions retrieved successfully',
                data: transactions
            })
        })
    }


    // Get a specific transaction
    static getATransaction(req: Request, res: Response) {
        const id = Number(req.params.id)
        TransactionsModel.findOne({
            where: { id }
        }).then((transaction) => {
            if (!transaction) return res.status(404).send({ success: false, message: 'Transaction not found' })
            return res.status(200).send({
                success: true,
                message: 'Transaction retrieved successfully',
                data: transaction
            })
        })
    }


    // Update a transaction
    static updateATransaction(req: Request, res: Response) {
        const transactionId = Number(req.params.id)
        TransactionsModel.findByPk(transactionId).then((transaction) => {
            if (transaction) {
                const {
                    transaction_id,
                    transaction_type,
                    client,
                    gender,
                    occupation,
                    transaction_summary,
                    cost
                } = req.body
                return transaction
                    .update({
                        transaction_id: transaction_id || transaction.transaction_id,
                        transaction_type: transaction_type || transaction.transaction_type,
                        client: client || transaction.client,
                        gender: gender || transaction.gender,
                        occupation: occupation || transaction.occupation,
                        transaction_summary: transaction_summary || transaction.transaction_summary,
                        cost: cost || transaction.cost
                    })
                    .then((transaction) => {
                        return res.status(200).send({
                            success: true,
                            message: 'Transaction Updated Successfully',
                            data: transaction
                        })
                    })
            } else {
                return res
                    .status(404)
                    .send({
                        success: false,
                        message: 'Transaction not found! Enter a valid ID'
                    })
            }
        })
    }


    // Delete a transaction
    static async deleteATransaction(req: Request, res: Response) {
        const transactionId = Number(req.params.id)
        const transaction = await TransactionsModel.findByPk(transactionId)

        if (!transaction) {
            return res.status(404).send({
                success: false,
                message: 'Transaction not found. Confirm ID'
            })
        }

        return transaction.destroy().then(() => {
            return res.status(200).send({
                success: true,
                message: 'Transaction Successfully Deleted'
            })
        })
    }


}



export default Transactions