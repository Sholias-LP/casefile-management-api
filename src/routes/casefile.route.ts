import express from 'express'
import Casefile from '../handlers/casefiles'

const router = express.Router()


router.post('/casefiles/new',  Casefile.addASchool);



export default router