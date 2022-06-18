import { Request, Response } from 'express'
import { BaseHandler } from '../interfaces/handler'
import TransactionsModel from '../models/transaction/transaction.model'
// import { v4 as uuidv4 } from 'uuid';
import { QueryOptions, Types } from 'mongoose'

interface ITransactionDocument {
    save: any;
    transaction_id: string;
    transaction_type: string;
    client: string;
    gender: string;
    occupation: string;
    brief: string;
    letter_of_engagement: string;
    service_fee: number;
    deposit: number[];
    expenses: any[];
    createdAt: Date;
    updatedAt: Date;
}

function alphanumeric_unique() {
    return Math.random().toString(36).split('').filter(function (value, index, self) {
        return self.indexOf(value) === index;
    }).join('').substr(2, 5);
}
class Transactions extends BaseHandler {


    static async addATransaction(req: Request, res: Response) {

        const { transactionType, client, gender, occupation, brief, letterOfEngagement, serviceFee, deposit, expenses } = req.body

        try {

            const newTransaction = new TransactionsModel({
                author: res.locals.user._id,
                transaction_id: `#${alphanumeric_unique()}`,
                transaction_type: transactionType,
                client: client,
                gender: gender,
                occupation: occupation,
                brief: brief,
                letter_of_engagement: letterOfEngagement,
                service_fee: serviceFee,
                deposit: deposit,
                expenses: expenses
            })

            await newTransaction.save().then((newTransaction) => {
                return res
                    .status(201)
                    .send({
                        success: true,
                        message: 'Transaction added successfully',
                        data: newTransaction
                    })
            }).catch((err) => { throw new Error((err as Error).message) })
        } catch (error) {
            throw new Error((error as Error).message);
        }

    }


    // Get all transactions
    static getAllTransactions(req: Request, res: Response) {

        try {

            const { transactionType, client, author } = req.query
            const filters = { isDeleted: false }

            if (transactionType) (filters as any).transaction_type = transactionType
            if (client) (filters as any).client = client
            if (author) (filters as any).author = (author as QueryOptions)

            console.table(filters)

            TransactionsModel.find(filters).then((transactions) => {
                return res.status(200).send({
                    success: true,
                    message: 'Transactions retrieved successfully',
                    count: transactions.length,
                    data: transactions
                })
            })

        } catch (error) {
            throw new Error((error as Error).message);
        }
    }


    // Get a specific transaction
    static getATransaction(req: Request, res: Response) {

        try {

            const id = req.params.id

            if (Types.ObjectId.isValid(id)) {
                TransactionsModel.find({ _id: id })
                    .then((transaction) => {
                        if (!transaction) {
                            return res.status(404).send({
                                success: false,
                                message: 'Transaction not found'
                            })
                        } else {
                            return res.status(200).send({
                                success: true,
                                message: 'Transaction retrieved successfully',
                                data: transaction
                            })
                        }
                    })
            } else {
                return res.status(404).send({ success: false, message: 'Invalid Id' })
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }



    // Update a transaction
    static updateATransaction(req: Request, res: Response) {

        try {
            const transactionId = req.params.id
            const { transactionID, transactionType, client, gender, occupation, brief, letterOfEngagement, serviceFee, deposit, expenses } = req.body

            if (Types.ObjectId.isValid(transactionId)) {

                return TransactionsModel.findById({ _id: transactionId }, (error: Error, document: ITransactionDocument) => {
                    if (error) res.send({ success: false, message: 'Update failed: ' + error })

                    if (document) {

                        document.transaction_id = transactionID || document.transaction_id,
                            document.transaction_type = transactionType || document.transaction_type,
                            document.client = client || document.client,
                            document.gender = gender || document.gender,
                            document.occupation = occupation || document.occupation,
                            document.brief = brief || document.brief,
                            document.letter_of_engagement = letterOfEngagement || document.letter_of_engagement,
                            document.service_fee = serviceFee || document.service_fee
                            document.deposit = deposit || document.deposit
                            document.expenses = expenses || document.expenses
                            // if (deposit) document.deposit[0] = deposit
                            // if (expenses) document.expenses[0] = expenses


                        document.save().then((transaction: ITransactionDocument) => {
                            return res.status(200).send({
                                success: true,
                                message: 'Transaction Updated Successfully',
                                data: transaction
                            })
                        }).catch((error: Error) => {
                            throw new Error(error.message);
                        })

                    } else {
                        return res.status(404).send(
                            {
                                success: false,
                                message: 'Transaction not found'
                            })
                    }

                })

            } else {
                return res.status(404).send(
                    {
                        success: false,
                        message: 'Invalid ID'
                    })
            }
        } catch (error) {
            throw new Error((error as Error).message);
        }

    }


    // Delete a transaction
    static async deleteATransaction(req: Request, res: Response) {
        try {

            const transactionId = req.params.id

            if (Types.ObjectId.isValid(transactionId)) {
                const transaction = await TransactionsModel.findByIdAndDelete(transactionId)

                if (!transaction) {
                    return res.status(404).send({
                        success: false,
                        message: 'Transaction not found.'
                    })
                } else {
                    return res.status(200).send({
                        success: true,
                        message: 'Transaction Successfully Deleted'
                    })
                }
            } else {
                return res.status(404).send({
                    success: false,
                    message: 'Invalid ID'
                })
            }


        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

}


export default Transactions
