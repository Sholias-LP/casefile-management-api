import chai from 'chai'
import supertest from 'supertest'
import jwt from 'jsonwebtoken'
import app from '../../app'
import models from '@models/index'

const secret = process.env.SECRET as string
const { expect } = chai
const request = supertest.agent(app)
const db: any = models
const CasefileModel = db.Casefile
const UserModel = db.User

let newCasefile: any = {}
let testUser: any = {}

const casefileData = {
    caseID: 'SHO_478907d6-f18a-496f-9b96-c806078f9bc6',
    caseType: 'Politics',
    client: 'Jane Doe',
    gender: 'Male',
    occupation: 'Software Developer',
    brief: 'BRIEF: is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s when an unknown printer took a galley of type.',
    letter_of_engagement: 'LETTER OF ENGAGMENT: is simply dummy text of the printing and typesetting industry. \'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s when an unknown printer took a galley.'
}

describe('Casefiles', () => {
  before(async () => {
    // Create Database Tables for Casefiles, and Users
    await db.sequelize.sync()
    newCasefile = await CasefileModel.create(casefileData)
    testUser = await UserModel.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'John@gmail.com',
      hash: 'password',
      role: 'partner'
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
    // Empty the Database
    await CasefileModel.destroy({ where: {} })
    await UserModel.destroy({ where: {} })
  })


  // Get All Casefiles
  describe('GET /api/v1/casefiles', () => {
    it('should get all casefiles', (done) => {
      request
        .get('/api/v1/casefiles')
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.be.equal(200)
          expect(res.body).to.be.an('object')
          expect(res.body.success).to.be.equal(true)
          expect(res.body.message).to.be.equal('Casefiles retrieved successfully')
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
  })

  //Get a Specific Casefile
  describe('GET /api/v1/casefiles/:id', () => {
    it('should return a specific casefile', (done) => {
      request
        .get(`/api/v1/casefiles/${newCasefile.id}`)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.be.equal(200)
          expect(res.body).to.be.an('object')
          expect(res.body.success).to.be.equal(true)
          expect(res.body.message).to.be.equal('Casefile retrieved successfully')
          expect(res.body.data).to.be.an('object')
          done()
        })
    })
    it('should display a message if casefile is not found', (done) => {
      request
        .get('/api/v1/casefiles/1000000')
        .expect(404)
        .end((err, res) => {
          expect(res.status).to.be.equal(404)
          expect(res.body).to.be.an('object')
          expect(res.body.success).to.be.equal(false)
          expect(res.body.message).to.be.equal('Casefile not found')
          done()
        })
    })
  })

  // Update a Specific Casefile
  describe('PUT /casefiles/:id', () => {
    it('should UPDATE a casefile given the id', (done) => {
      request
        .put(`/api/v1/casefiles/${newCasefile.id}`)
        .set('authorization', `Bearer ${testUser.token}`)
        .send({
            caseID: 'SHO_478907d6',
            caseType: 'Politics',
            client: 'Jon Doe',
            gender: 'male',
            occupation: 'Software Engineer',
            brief: 'BRIEF: is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s when an unknown printer took a galley of type.',
            letter_of_engagement: 'LETTER OF ENGAGMENT: is simply dummy text of the printing and typesetting industry. \'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s when an unknown printer took a galley.'
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200)
          expect(res.body).to.be.an('object')
          expect(res.body.success).to.be.equal(true)
          expect(res.body.message).to.be.equal('Casefile Updated Successfully')
          expect(res.body.data).to.be.an('object')
          done()
        })
    })
    it('should UPDATE a casefile if only one field is provided', (done) => {
      request
        .put(`/api/v1/casefiles/${newCasefile.id}`)
        .set('authorization', `Bearer ${testUser.token}`)
        .send({ client: 'John Doe' })
        .end((err, res) => {
          expect(res.status).to.be.equal(200)
          expect(res.body).to.be.an('object')
          expect(res.body.success).to.be.equal(true)
          expect(res.body.message).to.be.equal('Casefile Updated Successfully')
          expect(res.body.data).to.be.an('object')
          done()
        })
    })
    it('should UPDATE a casfile if only one field is provided', (done) => {
      request
        .put(`/api/v1/casefiles/${newCasefile.id}`)
        .set('authorization', `Bearer ${testUser.token}`)
        .send({ caseType: 'Divorce' })
        .end((err, res) => {
          expect(res.status).to.be.equal(200)
          expect(res.body).to.be.an('object')
          expect(res.body.success).to.be.equal(true)
          expect(res.body.message).to.be.equal('Casefile Updated Successfully')
          expect(res.body.data).to.be.an('object')
          done()
        })
    })
    it('should return no casefile if id does not exist', (done) => {
      request
        .put('/api/v1/casefiles/100000')
        .set('authorization', `Bearer ${testUser.token}`)
        .send(casefileData)
        .end((err, res) => {
          expect(res.status).to.be.equal(404)
          expect(res.body).to.be.an('object')
          expect(res.body.success).to.be.equal(false)
          expect(res.body.message).be.equal('Casefile not found! Enter a valid ID')
          done()
        })
    })
  })


  // Add a New Casefile
  describe('POST /casefile/new', () => {
    it('should add a new casefile', (done) => {
      request
        .post('/api/v1/casefiles/new')
        .set('authorization', `Bearer ${testUser.token}`)
        .send(casefileData)
        .end((err, res) => {
          expect(res.status).to.be.equal(201)
          expect(res.body).to.be.an('object')
          expect(res.body.success).to.be.equal(true)
          expect(res.body.message).be.equal('Casefile added successfully')
          expect(res.body.data).to.be.an('object')
          done()
        })
    })
  })

  // Delete a Casefile
  describe('DELETE /casefiles/:id', () => {
    it('should delete a casefile', (done) => {
      request
        .delete(`/api/v1/casefiles/${newCasefile.id}`)
        .set('authorization', `Bearer ${testUser.token}`)
        .end((err, res) => {
          expect(res.status).to.be.equal(200)
          expect(res.body).to.be.an('object')
          expect(res.body.success).to.be.equal(true)
          expect(res.body.message).be.equal('Casefile Successfully Deleted')
          done()
        })
    })
    it('should display a message if casefile is not found', (done) => {
      request
        .delete('/api/v1/casefiles/99999')
        .set('authorization', `Bearer ${testUser.token}`)
        .end((err, res) => {
          expect(res.status).to.be.equal(404)
          expect(res.body).to.be.an('object')
          expect(res.body.success).to.be.equal(false)
          expect(res.body.message).be.equal('Casefile not found. Use a valid')
          done()
        })
    })
  })

})
