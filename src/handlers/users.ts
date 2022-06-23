import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import isEmail from 'validator/lib/isEmail'
import UserModel from '../models/user/user.model'
import { Types } from 'mongoose'

const secret = process.env.SECRET as string

class User {

    static async Register(req: Request, res: Response) {

        try {

            if (!isEmail(req.body.email)) {
                return res.status(400).send({ message: 'Email Invalid' })
            } else {

                const { firstName, lastName, email, role, password, confirmPassword } = req.body
                const checkPasword = password === confirmPassword

                if (!checkPasword) return res.status(400).send({ message: 'Passwords do not match' })

                const checkDatabaseForEmail = await UserModel.exists({ email: req.body.email })

                if (checkDatabaseForEmail !== null) {
                    return res.status(400).send({ message: 'User Already Exists' })
                } else {
                    
                    UserModel.create({
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                        role: role,
                        hash: password
                    }).then((user) => {
                        return res.status(200).send({
                            success: true,
                            message: 'Sign Up Sucessful!',
                            data: {
                                first_name: user.first_name,
                                last_name: user.last_name,
                                email: user.email,
                                role: user.role,
                                avatar: user.avatar,
                                token: jwt.sign(
                                    {
                                        first_name: firstName,
                                        last_name: lastName,
                                        email: email,
                                        id: user._id,
                                        role: user.role
                                    },
                                    secret
                                )
                            }
                        })
                    })
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
                    if (!bcrypt.compareSync(password, user.hash)) {
                        return res.status(400).send({ message: 'Invalid Password' })
                    } else {
                        return res.status(200).send({
                            success: true,
                            message: 'Sign in Successful',
                            data: {
                                first_name: user.first_name,
                                last_name: user.last_name,
                                email: user.email,
                                role: user.role,
                                avatar: user.avatar,
                                token: jwt.sign(
                                    {
                                        first_name: user.first_name,
                                        last_name: user.last_name,
                                        email: user.email,
                                        role: user.role,
                                        id: user.id
                                    },
                                    secret
                                )
                            }
                        })
                    }
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


    // Reset User Password
    static async resetPassword(req: Request, res: Response) {

        try {

            const { newPassword, confirmNewPassword } = req.body
            const checkPasword = newPassword === confirmNewPassword

            const email = res.locals.user.email

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
