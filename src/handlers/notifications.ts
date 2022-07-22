import { match } from 'assert'
import { Request, Response } from 'express'
import { QueryOptions, Types } from 'mongoose'
import { BaseHandler } from '../interfaces/handler'
import IUser from '../models/user/user.interface'
import UserModel from '../models/user/user.model'


interface INotificationDocument {
    _id: Types.ObjectId;
    userId: Types.ObjectId,
    activity: string,
    resourceId: Types.ObjectId,
    date: number,
    status: string
    save: any;
}

class Notification extends BaseHandler {

    static popNotifications(req: Request, res: Response) {

        try {

            UserModel.findById(res.locals.user._id, (err: Error, user: IUser) => {
                if (err) {
                    res.send(err)
                } else {

                    const unread = user.notification.filter((element: any) => element.status === 'unread').length
                    const read = user.notification.filter((element: any) => element.status === 'read').length

                    return res.status(200).send({
                        success: true,
                        unread,
                        read,
                        data: user.notification.reverse()
                    })
                }
            })

        } catch (error) {
            res.send(error)
        }

    }


    static bulkMarkAsRead(req: Request, res: Response) {

        const bulkIds = req.body.notificationIds

        UserModel.findById({ _id: res.locals.user._id }, (error: Error, document: IUser) => {

            bulkIds.map((item: any) => {
                const match = document.notification.find((element: any) => String(item) == String(element._id))
                match ? match.status = 'read' : null
            })

            document.save().then(async (_el: any) => {
                return res.status(200).send({
                    success: true,
                    message: 'Marked as read'
                })
            }).catch((error: Error) => {
                throw new Error(error.message);
            })

        })

    }

    static bulkMarkAsUnread(req: Request, res: Response) {

        const bulkIds = req.body.notificationIds

        UserModel.findById({ _id: res.locals.user._id }, (error: Error, document: IUser) => {

            bulkIds.map((item: any) => {
                const match = document.notification.find((element: any) => String(item) == String(element._id))
                match ? match.status = 'unread' : null
            })

            document.save().then((_el: any) => {
                return res.status(200).send({
                    success: true,
                    message: 'Marked as unread'
                })
            }).catch((error: Error) => {
                throw new Error(error.message);
            })

        })

    }


    static bulkDelete(req: Request, res: Response) {

        const bulkIds = req.body.notificationIds

        UserModel.findById({ _id: res.locals.user._id }, (error: Error, document: IUser) => {

            bulkIds.map((item: any) => {
                const match = document.notification.find((element: any) => String(item) == String(element._id))
                const array: any = document.notification

                const index = array.indexOf(match);
                if (index > -1) {
                    array.splice(index, 1);
                }
            })

            document.save().then((_el: any) => {
                return res.sendStatus(204)
            }).catch((error: Error) => {
                throw new Error(error.message);
            })

        })

    }

}

export default Notification