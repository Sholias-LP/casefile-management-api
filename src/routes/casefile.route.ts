import express from 'express'
import Casefile from '../handlers/casefiles'

const router = express.Router()


router.post('/casefiles/new',  Casefile.addASchool);
router.get('/casefiles/',  Casefile.getAllCasefiles);
router.get('/casefiles/:id',  Casefile.getACasefile);



export default router