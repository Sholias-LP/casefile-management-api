import { Request, Response } from 'express'
import { BaseHandler } from '../interfaces/handler'
import models from '../models/index'
import { v4 as uuidv4 } from 'uuid';


const CasefilesModel = models.Casefile


class Casefiles extends BaseHandler {

    // Add a new Casefile
    static addASchool(req: Request, res: Response) {
        CasefilesModel.create({
            id: req.body.id,
            caseID: `SHO_${uuidv4()}`,
            caseType: req.body.caseType,
            client: req.body.client,
            gender: req.body.gender,
            occupation: req.body.occupation,
            brief: req.body.brief,
            letter_of_engagement: req.body.letter_of_engagement
        })
            .then((newCasefile) => {
                return res
                    .status(201)
                    .send({ message: 'Casefile added successfully', newCasefile })
            })
            .catch((err) => console.log(err))
    }


    // Get all casefiles
    static getAllCasefiles(req: Request, res: Response) {
        CasefilesModel.findAll().then((casefiles) => {
            return res.status(200).send({
                success: true,
                message: 'Casefiles retrieved successfully',
                data: casefiles
            })
        })
    }


}



export default Casefiles