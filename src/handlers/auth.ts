import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import isEmail from 'validator/lib/isEmail'
import UserModel from '../models/user/user.model'

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
                                fullname: `${user.first_name} ${user.last_name}`,
                                email: user.email,
                                role: user.role,
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
   


}

export default User
