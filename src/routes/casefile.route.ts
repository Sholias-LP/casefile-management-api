import express from 'express'
import Casefile from '@handlers/casefiles'

const router = express.Router()


router.post('/casefiles/new',  Casefile.addACasefile);
router.get('/casefiles/',  Casefile.getAllCasefiles);
router.get('/casefiles/:id',  Casefile.getACasefile);
router.put('/casefiles/:id',  Casefile.updateACasefile);
router.delete('/casefiles/:id',  Casefile.deleteACasefile);



export default router