// import chai from 'chai'
// import supertest from 'supertest'
// import jwt from 'jsonwebtoken'
// import app from '../../app'
// import models from '../../models/index'

// const secret = process.env.SECRET as string
// const { expect } = chai
// const request = supertest.agent(app)
// const db: any = models
// const TransactionModel = db.Transaction
// const UserModel = db.User

// let newTransaction: any = {}
// let testUser: any = {}

// const transactionData = {
//     transaction_id: 'SHO_478907d6-f18a-496f-9b96-c806078f9bc6',
//     transaction_type: 'Politics',
//     client: 'Jane Doe',
//     gender: 'Male',
//     occupation: 'Software Developer',
//     transaction_summary: 'BRIEF: is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text',
//     cost: 100000
// }

// describe('Transactions', () => {
//   before(async () => {
//     // Create Database Tables for Transactions, and Users
//     await db.sequelize.sync()
//     newTransaction = await TransactionModel.create(transactionData)
//     testUser = await UserModel.create({
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'John@gmail.com',
//       hash: 'password',
//       role: 'partner'
//     })

//     testUser.token = jwt.sign(
//       {
//         id: testUser.id,
//         firstName: testUser.firstName,
//         lastName: testUser.lastName,
//         email: testUser.email,
//         role: testUser.role
//       },
//       secret
//     )
//   })


//   after(async () => {
//     // Empty the Database
//     await TransactionModel.destroy({ where: {} })
//     await UserModel.destroy({ where: {} })
//   })


//   // Get All Transactions
//   describe('GET /api/v1/transactions', () => {
//     it('should get all transactions', (done) => {
//       request
//         .get('/api/v1/transactions')
//         .expect(200)
//         .end((err, res) => {
//           expect(res.status).to.be.equal(200)
//           expect(res.body).to.be.an('object')
//           expect(res.body.success).to.be.equal(true)
//           expect(res.body.message).to.be.equal('Transactions retrieved successfully')
//           expect(res.body.data).to.be.an('array')
//           done()
//         })
//     })
//   })

//   //Get a Specific Transaction
//   describe('GET /api/v1/transactions/:id', () => {
//     it('should return a specific transaction', (done) => {
//       request
//         .get(`/api/v1/transactions/${newTransaction.id}`)
//         .expect(200)
//         .end((err, res) => {
//           expect(res.status).to.be.equal(200)
//           expect(res.body).to.be.an('object')
//           expect(res.body.success).to.be.equal(true)
//           expect(res.body.message).to.be.equal('Transaction retrieved successfully')
//           expect(res.body.data).to.be.an('object')
//           done()
//         })
//     })
//     it('should display a message if transaction is not found', (done) => {
//       request
//         .get('/api/v1/transactions/1000000')
//         .expect(404)
//         .end((err, res) => {
//           expect(res.status).to.be.equal(404)
//           expect(res.body).to.be.an('object')
//           expect(res.body.success).to.be.equal(false)
//           expect(res.body.message).to.be.equal('Transaction not found')
//           done()
//         })
//     })
//   })

//   // Update a Specific Transacation
//   describe('PUT /transactions/:id', () => {
//     it('should UPDATE a transaction given the id', (done) => {
//       request
//         .put(`/api/v1/transactions/${newTransaction.id}`)
//         .set('authorization', `Bearer ${testUser.token}`)
//         .send({
//             transaction_id: 'SHO_478907d6-f18a-496f-9b96-c806078f9bc6',
//             transaction_type: 'Real Estate',
//             client: 'Jon Doe',
//             gender: 'male',
//             occupation: 'Software Engineer',
//             transaction_summary: 'BRIEF: is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text',
//             cost: 500000
//         })
//         .end((err, res) => {
//           expect(res.status).to.be.equal(200)
//           expect(res.body).to.be.an('object')
//           expect(res.body.success).to.be.equal(true)
//           expect(res.body.message).to.be.equal('Transaction Updated Successfully')
//           expect(res.body.data).to.be.an('object')
//           done()
//         })
//     })
//     it('should UPDATE a transaction if only one field is provided', (done) => {
//       request
//         .put(`/api/v1/transactions/${newTransaction.id}`)
//         .set('authorization', `Bearer ${testUser.token}`)
//         .send({ client: 'Johnson Doe' })
//         .end((err, res) => {
//           expect(res.status).to.be.equal(200)
//           expect(res.body).to.be.an('object')
//           expect(res.body.success).to.be.equal(true)
//           expect(res.body.message).to.be.equal('Transaction Updated Successfully')
//           expect(res.body.data).to.be.an('object')
//           done()
//         })
//     })
//     it('should UPDATE a transaction if only one field is provided', (done) => {
//       request
//         .put(`/api/v1/transactions/${newTransaction.id}`)
//         .set('authorization', `Bearer ${testUser.token}`)
//         .send({ cost: 3000000 })
//         .end((err, res) => {
//           expect(res.status).to.be.equal(200)
//           expect(res.body).to.be.an('object')
//           expect(res.body.success).to.be.equal(true)
//           expect(res.body.message).to.be.equal('Transaction Updated Successfully')
//           expect(res.body.data).to.be.an('object')
//           done()
//         })
//     })
//     it('should return no transaction if id does not exist', (done) => {
//       request
//         .put('/api/v1/transactions/100000')
//         .set('authorization', `Bearer ${testUser.token}`)
//         .send(transactionData)
//         .end((err, res) => {
//           expect(res.status).to.be.equal(404)
//           expect(res.body).to.be.an('object')
//           expect(res.body.success).to.be.equal(false)
//           expect(res.body.message).be.equal('Transaction not found! Enter a valid ID')
//           done()
//         })
//     })
//   })


//   // Add a New Transaction
//   describe('POST /transaction/new', () => {
//     it('should add a new transaction', (done) => {
//       request
//         .post('/api/v1/transactions/new')
//         .set('authorization', `Bearer ${testUser.token}`)
//         .send(transactionData)
//         .end((err, res) => {
//           expect(res.status).to.be.equal(201)
//           expect(res.body).to.be.an('object')
//           expect(res.body.success).to.be.equal(true)
//           expect(res.body.message).be.equal('Transaction added successfully')
//           expect(res.body.data).to.be.an('object')
//           done()
//         })
//     })
//   })

//   // Delete a Transaction
//   describe('DELETE /transactions/:id', () => {
//     it('should delete a transaction', (done) => {
//       request
//         .delete(`/api/v1/transactions/${newTransaction.id}`)
//         .set('authorization', `Bearer ${testUser.token}`)
//         .end((err, res) => {
//           expect(res.status).to.be.equal(200)
//           expect(res.body).to.be.an('object')
//           expect(res.body.success).to.be.equal(true)
//           expect(res.body.message).be.equal('Transaction Successfully Deleted')
//           done()
//         })
//     })
//     it('should display a message if transaction is not found', (done) => {
//       request
//         .delete('/api/v1/transactions/99999')
//         .set('authorization', `Bearer ${testUser.token}`)
//         .end((err, res) => {
//           expect(res.status).to.be.equal(404)
//           expect(res.body).to.be.an('object')
//           expect(res.body.success).to.be.equal(false)
//           expect(res.body.message).be.equal('Transaction not found. Confirm ID')
//           done()
//         })
//     })
//   })

// })
