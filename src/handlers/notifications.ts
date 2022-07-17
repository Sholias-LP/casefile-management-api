import { Request, Response } from 'express'
import { QueryOptions, Types } from 'mongoose'
import { BaseHandler } from '../interfaces/handler'
import IUser from '../models/user/user.interface'
import UserModel from '../models/user/user.model'


class Notification extends BaseHandler {

    static popNotifications(req: Request, res: Response) {

        try {

            UserModel.findById(res.locals.user._id, (err: Error, user: IUser) => {
                if (err) {
                    res.send(err)
                } else {
                    return res.status(200).send({
                        success: true,
                        data: user.notification.reverse()
                    })
                }
            })


        } catch (error) {
            res.send(error)
        }

    }


    static markAsRead(req: Request, res: Response) {}

    static markAsUnread(req: Request, res: Response) {}

}

export default Notification