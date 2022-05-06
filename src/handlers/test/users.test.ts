import chai from 'chai'
import supertest from 'supertest'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import app from '../../app'
import models from '../../models'

const { expect } = chai
const request = supertest.agent(app)
const db: any = models
const UserModel = db.User
const secret = process.env.SECRET as string

let testUser: any = {}

describe('USERS', () => {

    before(async () => {
        // Create database table
        await db.sequelize.sync()
        testUser = await UserModel.create({
            firstName: 'John',
            lastName: 'Doe',
            email: 'John@gmail.com',
            hash: bcrypt.hashSync('password', 8),
            role: 'associate'
        })

        testUser.token = jwt.sign(
            {
                id: testUser.id,
                firstName: testUser.firstName,
                lastName: testUser.lastName,
                email: testUser.email,
                role: testUser.role
            },
            secret
        )
    })

    after(async () => {
        // Empty the database
        await UserModel.destroy({ where: {} })
    })


    // Register User
    describe('POST /api/v1/users/register', () => {
        it('Should Create New User', (done) => {
            const newUser = {
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'Jane@gmail.com',
                role: 'associate',
                password: 'jane',
                confirmPassword: 'jane'
            }
            request
                .post('/api/v1/users/register')
                .send(newUser)
                .end((err, res) => {
                    expect(res.status).to.be.equal(200)
                    expect(res.body.message).be.equal('Sign Up Sucessful!')
                    done()
                })
        })

        it('Should Return \'Email Invalid\'', (done) => {
            const testInvalidEmail = {
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'Janegmail.com',
                role: 'associate',
                password: 'jane',
                confirmPassword: 'jane'
            }
            request
                .post('/api/v1/users/register')
                .send(testInvalidEmail)
                .end((err, res) => {
                    expect(res.status).to.be.equal(400)
                    expect(res.body.message).be.equal('Email Invalid')
                    done()
                })
        })

        it('Should Return \'Password do not Match\'', (done) => {
            const testMismatchedPassword = {
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'Jane@gmail.com',
                role: 'associate',
                password: 'jane',
                confirmPassword: 'jan'
            }
            request
                .post('/api/v1/users/register')
                .send(testMismatchedPassword)
                .end((err, res) => {
                    expect(res.status).to.be.equal(400)
                    expect(res.body.message).be.equal('Passwords do not match')
                    done()
                })
        })
    })


    // Sign-In User
    describe('POST /api/v1/users/signin', () => {

        it('Should Signin a New User', (done) => {
            const loginDetails = {
                email: 'Jane@gmail.com',
                password: 'jane'
            }
            request
                .post('/api/v1/users/signin')
                .send(loginDetails)
                .end((err, res) => {
                    expect(res.status).to.be.equal(200)
                    expect(res.body.message).be.equal('Sign in Successful')
                    done()
                })
        })

        it('Should Return \'Invalid Password\'', (done) => {
            const testInvalidPassword = {
                email: 'Jane@gmail.com',
                password: 'ja'
            }
            request
                .post('/api/v1/users/signin')
                .send(testInvalidPassword)
                .end((err, res) => {
                    expect(res.status).to.be.equal(400)
                    expect(res.body.message).be.equal('Invalid Password')
                    done()
                })
        })

        it('Should Return \'Email or password incorrect\'', (done) => {
            const testInvalidEmail = {
                email: 'Janegmail.com',
                password: 'jne'
            }
            request
                .post('/api/v1/users/signin')
                .send(testInvalidEmail)
                .end((err, res) => {
                    expect(res.status).to.be.equal(400)
                    expect(res.body.message).be.equal('Invalid Email')
                    done()
                })
        })

        it('Should Return \'Email or password incorrect\'', (done) => {
            const testInvalidEmail = {
                email: 'jaen@glami.cam',
                password: 'enaj'
            }
            request
                .post('/api/v1/users/signin')
                .send(testInvalidEmail)
                .end((err, res) => {
                    expect(res.status).to.be.equal(400)
                    expect(res.body.message).be.equal('Email or password incorrect')
                    done()
                })
        })

    })


    // Get All Users
    describe('GET /api/v1/users/', () => {
        it('Should Get All Users', (done) => {
            request
                .get('/api/v1/users')
                .expect(200)
                .end((err, res) => {
                    expect(res.status).to.be.equal(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })
    })


    // Get Users By Role
    describe('GET /api/v1/users/role', () => {
        it('Should Get Users By Role', (done) => {
            request
                .get('/api/v1/users/role')
                .query({role: 'partner'})
                .end((err, res) => {
                    expect(res.status).to.be.equal(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })
    })


})
