import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import isEmail from 'validator/lib/isEmail'
import UserModel from '../models/user/user.model'
import { Types } from 'mongoose'
import CasefileModel from '../models/casefile/casefile.model'
import TransactionModel from '../models/transaction/transaction.model'
import IUser from '../models/user/user.interface'

const secret = process.env.SECRET as string

class User {

    static async Register(req: Request, res: Response) {

        try {

            if (!isEmail(req.body.email)) {
                return res.status(400).send({ message: 'Email Invalid' })
            } else {

                const { firstName, lastName, email, role, password, confirmPassword } = req.body

                if (password.length < 7) {
                    return res.status(400).send({ message: 'Password must be above 6 characters' })
                } else {

                    const checkPasword = password === confirmPassword

                    if (!checkPasword) {
                        return res.status(400).send({ message: 'Passwords do not match' })
                    } else {

                        const checkDatabaseForEmail = await UserModel.exists({ email: req.body.email })

                        checkDatabaseForEmail !== null
                            ? res.status(400).send({ message: 'User Already Exists' })
                            : (UserModel.create({
                                first_name: firstName,
                                last_name: lastName,
                                email: email,
                                role: role,
                                hash: bcrypt.hashSync(password, 10)
                            }).then((_user) => {
                                return res.status(200).send({
                                    success: true,
                                    message: 'Sign Up Sucessful!'
                                })
                            }))
                    }
                }
            }
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }


    // Sign-In User
    static async signIn(req: Request, res: Response) {

        try {

            const { email, password } = req.body

            if (!isEmail(email)) {
                return res.status(400).send({ message: 'Invalid Email' })
            } else {

                const user = await UserModel.findOne({ email: email })

                if (user) {
                    const payload = {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        role: user.role,
                        avatar: user.avatar
                    }

                    !bcrypt.compareSync(password, user.hash)
                        ? res.status(400).send({ message: 'Invalid Password' })
                        : res.status(200).send({
                            success: true,
                            message: 'Sign in Successful',
                            data: {
                                ...payload,
                                token: jwt.sign(
                                    { id: user._id, ...payload },
                                    secret,
                                    { expiresIn: '24h' }
                                )
                            }
                        })

                } else {
                    return res.status(400).send({ message: 'Email or password incorrect' })
                }
            }

        } catch (error) {
            throw new Error((error as Error).message);
        }
    }


    // Get All Users
    static async getAllUsers(req: Request, res: Response) {

        try {

            const { role } = req.query
            const filters = { isDeleted: false }

            if (role) (filters as any).role = role

            UserModel.find(filters).then((users) => {
                return res.status(200).send({
                    success: true,
                    count: users.length,
                    data: users
                })
            })
        } catch (error) {
            throw new Error((error as Error).message);
        }

    }


    // Get All Resources by a User
    static async getAllResourcesByAUser(req: Request, res: Response) {

        try {

            const id = req.params.id

            if (Types.ObjectId.isValid(id)) {

                const casefilesByUser = await CasefileModel.find({ author: id })
                const transactionsByUser = await TransactionModel.find({ author: id })

                res.status(200).send({
                    success: true,
                    count: [...casefilesByUser, ...transactionsByUser].length,
                    data: {
                        casefiles: casefilesByUser.reverse(),
                        transactions: transactionsByUser.reverse()
                    }
                })

            } else {
                return res.status(404).send({ success: false, message: 'Invalid Id' })
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }



    // Get a specific user
    static getAUser(req: Request, res: Response) {

        try {

            const id = req.params.id

            if (Types.ObjectId.isValid(id)) {
                UserModel.findOne({ _id: id })
                    .then((user) => {
                        !user
                            ? res.status(404).send({ success: false, message: 'User not found' })
                            : res.status(200).send({ success: true, message: 'User retrieved successfully', data: user })

                    })
            } else {
                return res.status(404).send({ success: false, message: 'Invalid Id' })
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }



    // Update a user
    static async updateAUser(req: Request, res: Response) {

        try {
            const userId = req.params.id
            const { firstName, lastName } = req.body

            if (Types.ObjectId.isValid(userId)) {

                UserModel.findById({ _id: userId }, (error: Error, document: IUser) => {
                    if (error) return res.send({ success: false, message: 'Update failed: ' + error })

                    if (document) {
                        document.first_name = firstName || document.first_name
                        document.last_name = lastName || document.last_name

                        document.save().then(async (user: IUser) => {

                            return res.status(200).send({
                                success: true,
                                message: 'User Updated Successfully',
                                data: user
                            })
                        }).catch((error: Error) => {
                            throw new Error(error.message);
                        })
                    } else {
                        return res.status(404).send(
                            {
                                success: false,
                                message: 'User not found'
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



    // Reset User Password
    static async resetPassword(req: Request, res: Response) {

        const { newPassword, confirmNewPassword } = req.body
        const checkPasword = newPassword === confirmNewPassword

        const email = res.locals.user.email

        const query = { email: email }
        const update = { hash: bcrypt.hashSync(newPassword, 10) }

        try {

            UserModel.findOneAndUpdate(query, { $set: update }, (error: any, document: any) => {
                if (error) throw new Error(`Error: ${error.message}`);

                if (!document) {
                    return res.status(400).send({
                        success: false,
                        message: 'This user doesn\'t exist'
                    })
                } else {
                    if (!checkPasword) {
                        res.status(400).send({ message: 'Passwords do not match' })
                    } else {

                        if (!bcrypt.compareSync(newPassword, document.hash)) {
                            return res.status(200).send({
                                success: true,
                                message: 'Password Changed'
                            })
                        } else {
                            return res.status(200).send({
                                success: true,
                                message: 'No changes made'
                            })
                        }

                    }
                }
            })

        } catch (error) {
            throw new Error((error as Error).message)
        }

    }



    // Recover Password
    static async forgotPassword(req: Request, res: Response) {

        const { email, newPassword, confirmNewPassword } = req.body
        const checkPasword = newPassword === confirmNewPassword

        try {

            if (!isEmail(email)) {
                return res.status(400).send({
                    success: false,
                    message: 'Invalid Email'
                })
            } else {

                const query = { email: email }
                const update = { hash: bcrypt.hashSync(newPassword, 10) }

                UserModel.findOneAndUpdate(query, { $set: update }, (error: any, document: any) => {
                    if (error) throw new Error(`Error: ${error.message}`);

                    if (!document) {
                        return res.status(400).send({
                            success: false,
                            message: 'This user doesn\'t exist'
                        })
                    } else {

                        if (!checkPasword) {
                            res.status(400).send({ message: 'Passwords do not match' })
                        } else {
                            return res.status(200).send({
                                success: true,
                                message: 'Password Changed'
                            })
                        }
                    }

                })
            }

        } catch (error) {
            throw new Error((error as Error).message)
        }
    }



    // Delete a user
    static async deleteAUser(req: Request, res: Response) {

        try {
            const userId = req.params.id

            if (Types.ObjectId.isValid(userId)) {
                const user = await UserModel.findByIdAndDelete(userId)

                if (!user) {
                    return res.status(404).send({
                        success: false,
                        message: 'User not found.'
                    })
                } else {
                    return res.status(200).send({
                        success: true,
                        message: 'User Successfully Deleted'
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

export default User
