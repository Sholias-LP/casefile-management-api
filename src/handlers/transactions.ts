import { Request, Response } from 'express'
import { BaseHandler } from '../interfaces/handler'
import TransactionsModel from '../models/transaction/transaction.model'
import { QueryOptions, Types } from 'mongoose'
import crypto from 'crypto'
import UserModel from '../models/user/user.model'
import IUser from '../models/user/user.interface'

interface ITransactionDocument {
    _id: Types.ObjectId;
    author: Types.ObjectId;
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
    status: string;
    views: number;
    createdAt: Date;
    updatedAt: Date;
    save: any;
}

class Transactions extends BaseHandler {


    static async addATransaction(req: Request, res: Response) {

        const { transactionType, client, gender, occupation, brief, letterOfEngagement, serviceFee, deposit, expenses } = req.body

        try {

            const newTransaction = new TransactionsModel({
                author: res.locals.user._id,
                transaction_id: crypto.randomBytes(2).toString('hex').toUpperCase(),
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

            await newTransaction.save().then(async (newTransaction) => {

                const { _id, first_name, last_name } = res.locals.user

                const notificationMessage = {
                    userId: _id,
                    user: first_name+' '+last_name,
                    activity: 'created a transaction',
                    resourceId: newTransaction._id,
                    resource: newTransaction.transaction_id,
                    date: Date.now(),
                    status: 'unread'
                }


                const users = await UserModel.find({})
                users.map(async (user: IUser) => {
                    !user._id.equals(res.locals.user._id) ? user.notification.push(notificationMessage) : null
                    await user.save()
                })

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

            const { transactionID, transactionType, client, author } = req.query
            const filters = { isDeleted: false }

            if (transactionID) (filters as any).transaction_id = transactionID
            if (transactionType) (filters as any).transaction_type = transactionType
            if (client) (filters as any).client = client
            if (author) (filters as any).author = (author as QueryOptions)

            TransactionsModel.find(filters).then((transactions) => {
                return res.status(200).send({
                    success: true,
                    message: 'Transactions retrieved successfully',
                    count: transactions.length,
                    data: transactions.reverse()
                })
            })

        } catch (error) {
            throw new Error((error as Error).message);
        }
    }


    // Get a specific transaction
    static async getATransaction(req: Request, res: Response) {

        try {

            const id = req.params.id

            if (Types.ObjectId.isValid(id)) {

                const transaction = await TransactionsModel.findById(id)
                transaction?.views != null ? transaction.views++ : null
                transaction?.save()
                    .then((transaction) => {
                        return res.status(200).send({
                            success: true,
                            message: 'Transaction retrieved successfully',
                            data: transaction
                        })

                    })


            } else {
                return res.status(404).send({ success: false, message: 'Invalid Id' })
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }


    // Get number of views on a transaction
    static async getNumberOfViews(req: Request, res: Response) {

        try {
            const { id } = req.params

            if (Types.ObjectId.isValid(id)) {

                TransactionsModel.findById(id, (err: Error, document: ITransactionDocument) => {
                    if (err) res.send(err)
                    return res.status(200).send({
                        success: true,
                        data: document.views
                    })
                })

            } else {
                return res.status(404).send({ success: false, message: 'Invalid Id' })
            }
        } catch (error) {
            throw new Error((error as Error).message);
        }

    }


    // Get total amount deposited by client
    static async getTotalDeposit(req: Request, res: Response) {

        try {
            const { id } = req.params

            if (Types.ObjectId.isValid(id)) {

                TransactionsModel.findById(id, (err: Error, document: ITransactionDocument) => {
                    if (err) res.send(err)

                    const totalDeposit = document.deposit
                        .map((item: any) => item.amount)
                        .reduce((a, b) => a + b, 0)

                    return res.status(200).send({
                        success: true,
                        data: totalDeposit
                    })
                })

            } else {
                return res.status(404).send({ success: false, message: 'Invalid Id' })
            }
        } catch (error) {
            throw new Error((error as Error).message);
        }

    }


    // Get client's balance
    static async getBalance(req: Request, res: Response) {

        try {
            const { id } = req.params

            if (Types.ObjectId.isValid(id)) {

                TransactionsModel.findById(id, (err: Error, document: ITransactionDocument) => {
                    if (err) res.send(err)

                    const serviceCharge = document.service_fee

                    const totalDeposit = document.deposit
                        .map((item: any) => item.amount)
                        .reduce((a, b) => a + b, 0)

                    const balance = serviceCharge - totalDeposit

                    return res.status(200).send({
                        success: true,
                        data: balance
                    })
                })

            } else {
                return res.status(404).send({ success: false, message: 'Invalid Id' })
            }
        } catch (error) {
            throw new Error((error as Error).message);
        }

    }


    // Get total expenses incurred
    static async getTotalExpenses(req: Request, res: Response) {

        try {
            const { id } = req.params

            if (Types.ObjectId.isValid(id)) {

                TransactionsModel.findById(id, (err: Error, document: ITransactionDocument) => {
                    if (err) res.send(err)

                    const totalExpenses = document.expenses
                        .map((item: any) => item.amount)
                        .reduce((a, b) => a + b, 0)

                    return res.status(200).send({
                        success: true,
                        data: totalExpenses
                    })
                })

            } else {
                return res.status(404).send({ success: false, message: 'Invalid Id' })
            }
        } catch (error) {
            throw new Error((error as Error).message);
        }

    }


    // Update a transaction
    static updateATransaction(req: Request, res: Response) {

        try {
            const transactionId = req.params.id
            const { transactionType, client, gender, occupation, brief, letterOfEngagement, serviceFee, deposit, expenses } = req.body

            if (Types.ObjectId.isValid(transactionId)) {

                return TransactionsModel.findById({ _id: transactionId }, (error: Error, document: ITransactionDocument) => {
                    if (error) res.send({ success: false, message: 'Update failed: ' + error })

                    if (document) {

                        document.transaction_type = transactionType || document.transaction_type,
                            document.client = client || document.client,
                            document.gender = gender || document.gender,
                            document.occupation = occupation || document.occupation,
                            document.brief = brief || document.brief,
                            document.letter_of_engagement = letterOfEngagement || document.letter_of_engagement,
                            document.service_fee = serviceFee || document.service_fee
                        document.deposit = deposit || document.deposit
                        document.expenses = expenses || document.expenses


                        document.save().then(async (transaction: ITransactionDocument) => {

                            const { _id, first_name, last_name } = res.locals.user

                            const notificationMessage = {
                                userId: _id,
                                user: first_name+' '+last_name,
                                activity: 'made changes to a transaction',
                                resourceId: document._id,
                                resource: document.transaction_id,
                                date: Date.now(),
                                status: 'unread'
                            }

                            const _authorNotificationMessage = {
                                userId: _id,
                                user: first_name+' '+last_name,
                                activity: 'made changes to a transaction you created',
                                resourceId: document._id,
                                resource: document.transaction_id,
                                date: Date.now(),
                                status: 'unread'
                            }


                            const users = await UserModel.find({})
                            users.map(async (user: IUser) => {

                                if (!user._id.equals(res.locals.user._id)) {
                                    user._id.equals(transaction.author)
                                        ? user.notification.push(_authorNotificationMessage)
                                        : user.notification.push(notificationMessage)
                                }

                                await user.save()
                            })


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


    // Close a transaction
    static closeATtransaction(req: Request, res: Response) {

        const transactionId = req.params.id

        try {

            if (Types.ObjectId.isValid(transactionId)) {

                TransactionsModel.findById({ _id: transactionId }, (error: Error, document: ITransactionDocument) => {
                    if (error) return res.send({ success: false, message: 'Failed to close transaction: ' + error })

                    if (document) {

                        document.status = 'closed'

                        document.save().then(async (_transaction: ITransactionDocument) => {

                            const { _id, first_name, last_name } = res.locals.user

                            const notificationMessage = {
                                userId: _id,
                                user: first_name+' '+last_name,
                                activity: 'closed a transaction',
                                resourceId: document._id,
                                resource: document.transaction_id,
                                date: Date.now(),
                                status: 'unread'
                            }

                            const _authorNotificationMessage = {
                                userId: _id,
                                user: first_name+' '+last_name,
                                activity: 'closed a transaction you created',
                                resourceId: document._id,
                                resource: document.transaction_id,
                                date: Date.now(),
                                status: 'unread'
                            }


                            const users = await UserModel.find({})
                            users.map(async (user: IUser) => {
                                if (!user._id.equals(res.locals.user._id)) {
                                    user._id.equals(document.author)
                                        ? user.notification.push(_authorNotificationMessage)
                                        : user.notification.push(notificationMessage)
                                }

                                await user.save()
                            })

                            return res.status(200).send({
                                success: true,
                                message: 'Transacation Closed Successfully'
                            })
                        }).catch((error: Error) => {
                            throw new Error(error.message);
                        })
                    } else {
                        return res.status(404).send(
                            {
                                success: false,
                                message: 'Transacation not found'
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

                    const { _id, first_name, last_name } = res.locals.user


                    const notificationMessage = {
                        userId: _id,
                        user: first_name+' '+last_name,
                        activity: 'deleted a transaction',
                        resourceId: transaction._id,
                        resource: transaction.transaction_id,
                        date: Date.now(),
                        status: 'unread'
                    }

                    const _authorNotificationMessage = {
                        userId: _id,
                        user: first_name+' '+last_name,
                        activity: 'deleted a transaction you created',
                        resourceId: transaction._id,
                        resource: transaction.transaction_id,
                        date: Date.now(),
                        status: 'unread'
                    }



                    const users = await UserModel.find({})

                    users.map(async (user: IUser) => {

                        if (!user._id.equals(res.locals.user._id)) {
                            user._id.equals(transaction.author)
                                ? user.notification.push(_authorNotificationMessage)
                                : user.notification.push(notificationMessage)
                        }

                        await user.save()
                    })


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
