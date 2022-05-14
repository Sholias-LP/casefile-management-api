import express from 'express'
import Casefile from '../handlers/casefiles'
import validateToken from '../validators/validate-token'
import authorizeUser from '../validators/authorization'

const router = express.Router()


router.post('/casefiles/new', validateToken, authorizeUser, Casefile.addACasefile);
router.get('/casefiles/',  Casefile.getAllCasefiles);
router.get('/casefiles/:id',  Casefile.getACasefile);
router.put('/casefiles/:id', validateToken, authorizeUser, Casefile.updateACasefile);
router.delete('/casefiles/:id', validateToken, authorizeUser, Casefile.deleteACasefile);


export default router