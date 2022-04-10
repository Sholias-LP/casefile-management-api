import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import isEmail from 'validator/lib/isEmail'
import Models from '../models'

const UserModel = Models.User
const secret = process.env.SECRET as string

class User {

    // Register user
    static async Register(req: Request, res: Response) {
        if (!isEmail(req.body.email)) {
            return res.status(400).send({ message: 'Email Invalid' })
        } else {
            const password = req.body.password
            const confirmPassword = req.body.confirmPassword
            const checkPasword = password === confirmPassword

            if (!checkPasword)
                return res.status(400).send({ message: 'Passwords do not match' })

            const [user, created] = await UserModel.findOrCreate({
                where: { email: req.body.email },
                defaults: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    role: req.body.role,
                    hash: password
                }
            })
            if (created) {
                return res.status(200).send({
                    success: true,
                    message: 'Sign Up Sucessful!',
                    data: {
                        fullname: `${user.firstName} ${user.lastName}`,
                        email: user.email,
                        role: user.role,
                        token: jwt.sign(
                            {
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                email: req.body.email,
                                id: user.id,
                                role: user.role
                            },
                            secret
                        )
                    }
                })
            } else {
                return res.status(400).send({ message: 'User Already Exists' })
            }
        }
    }


    // Sign-In User
    static async signIn(req: Request, res: Response) {
        if (!isEmail(req.body.email)) {
            return res.status(400).send({ message: 'Invalid Email' })
        } else {
            const user = await UserModel.findOne({ where: { email: req.body.email } })

            if (user) {
                if (!bcrypt.compareSync(req.body.password, user.hash)) {
                    return res.status(400).send({ message: 'Invalid Password' })
                } else {
                    return res.status(200).send({
                        success: true,
                        message: 'Sign in Successful',
                        data: {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            role: user.role,
                            token: jwt.sign(
                                {
                                    firstName: user.firstName,
                                    lastName: user.lastName,
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
    }


    // Get All Users
    static async getAllUsers(req: Request, res: Response) {

        UserModel.findAll().then((counsel) => {
            return res.status(200).send({
                success: true,
                data: counsel
            })
        })


    }

}

export default User