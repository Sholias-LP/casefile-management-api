import { Request, Response } from 'express'
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
                    const notifications = user.notification
                    // const blank: [] = []
                    // user.notification = blank
                    // user.save()
                    return res.status(200).send({
                        success: true,
                        data: notifications
                    })
                }
            })


        } catch (error) {
            res.send(error)
        }

    }

}

export default Notification