import { Request, Response } from 'express'
import { BaseHandler } from '../interfaces/handler'
import casefileModel from '../models/casefile/casefile.model'
import TransactionModel from '../models/transaction/transaction.model'
import UserModel from '../models/user/user.model'


class nukeApplication extends BaseHandler {

    static deployNuke(req: Request, res: Response) {

        try {
            UserModel.deleteMany({}, (error) => {
                TransactionModel.deleteMany({}, (error) => {
                    casefileModel.deleteMany({}, (error) => {
                        error ? res.send(error) : res.sendStatus(201)
                    })
                })
            })
        } catch (error) {
            res.send(error)
        }

    }

}

export default nukeApplication
