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


    static markAsRead(req: Request, res: Response) {

        const notificationId = new Types.ObjectId(req.params.id)

        try {

            if (Types.ObjectId.isValid(notificationId)) {

                UserModel.findById({ _id: res.locals.user._id }, (error: Error, document: IUser) => {

                    if (error) return res.send({ success: false, message: 'Failed to mark as read: ' + error })

                    const getNotification = document.notification.find((element: any) => String(element._id) == String(notificationId))


                    if (!getNotification) {
                        return res.status(404).send({
                            success: false,
                            message: 'Notification not found'
                        })
                    } else {
                        if (getNotification.status === 'read') return res.status(200).send({ success: false, message: 'Already marked as read' })

                        getNotification.status = 'read'
                        document.save().then(async (_el: any) => {
                            return res.status(200).send({
                                success: true,
                                message: 'Marked as read'
                            })
                        }).catch((error: Error) => {
                            throw new Error(error.message);
                        })
                    }
                })
            } else {
                return res.status(404).send({success: false, message: 'Invalid ID' })
            }
        } catch (error) {
            throw new Error((error as Error).message);
        }

    }

    static markAsUnread(req: Request, res: Response) {


        const notificationId = new Types.ObjectId(req.params.id)

        try {

            if (Types.ObjectId.isValid(notificationId)) {

                UserModel.findById({ _id: res.locals.user._id }, (error: Error, document: IUser) => {

                    if (error) return res.send({ success: false, message: 'Failed to mark as unread: ' + error })

                    const getNotification = document.notification.find((element: any) => String(element._id) == String(notificationId))


                    if (!getNotification) {
                        return res.status(404).send({
                            success: false,
                            message: 'Notification not found'
                        })
                    } else {
                        if (getNotification.status === 'unread') return res.status(201).send({ success: false, message: 'Already marked as unread' })

                        getNotification.status = 'unread'
                        document.save().then(async (_el: any) => {
                            return res.status(200).send({
                                success: true,
                                message: 'Marked as unread'
                            })
                        }).catch((error: Error) => {
                            throw new Error(error.message);
                        })
                    }
                })
            } else {
                return res.status(404).send({success: false, message: 'Invalid ID' })
            }
        } catch (error) {
            throw new Error((error as Error).message);
        }

    }

}

export default Notification