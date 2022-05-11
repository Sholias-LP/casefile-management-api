import { Request, Response } from 'express'
import { BaseHandler } from '@interfaces/handler'
import models from '@models/index.js'
import { v4 as uuidv4 } from 'uuid';

const CasefilesModel = models.Casefile

class Casefiles extends BaseHandler {

    // Add a new Casefile
    static addACasefile(req: Request, res: Response) {
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
                    .send({
                        success: true,
                        message: 'Casefile added successfully',
                        data: newCasefile
                    })
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


    // Get a specific casefile
    static getACasefile(req: Request, res: Response) {
        const id = Number(req.params.id)
        CasefilesModel.findOne({
            where: { id }
        }).then((casefile) => {
            if (!casefile) return res.status(404).send({ success: false, message: 'Casefile not found' })
            return res.status(200).send({
                success: true,
                message: 'Casefile retrieved successfully',
                data: casefile
            })
        })
    }


    // Update a casefile
    static updateACasefile(req: Request, res: Response) {
        const casefileId = Number(req.params.id)
        CasefilesModel.findByPk(casefileId).then((casefile) => {
            if (casefile) {
                const {
                    caseID,
                    caseType,
                    client,
                    gender,
                    occupation,
                    brief,
                    letter_of_engagement
                } = req.body
                return casefile
                    .update({
                        caseID: caseID || casefile.caseID,
                        caseType: caseType || casefile.caseType,
                        client: client || casefile.client,
                        gender: gender || casefile.gender,
                        occupation: occupation || casefile.occupation,
                        brief: brief || casefile.brief,
                        letter_of_engagement: letter_of_engagement || casefile.letter_of_engagement
                    })
                    .then((casefile) => {
                        return res.status(200).send({
                            success: true,
                            message: 'Casefile Updated Successfully',
                            data: casefile
                        })
                    })
            } else {
                return res
                    .status(404)
                    .send({
                        success: false,
                        message: 'Casefile not found! Enter a valid ID'
                    })
            }
        })
    }


    // Delete a casefile
    static async deleteACasefile(req: Request, res: Response) {
        const casefileId = Number(req.params.id)
        const casefile = await CasefilesModel.findByPk(casefileId)

        if (!casefile) {
            return res.status(404).send({
                success: false,
                message: 'Casefile not found. Use a valid'
            })
        }

        return casefile.destroy().then(() => {
            return res.status(200).send({
                success: true,
                message: 'Casefile Successfully Deleted'
            })
        })
    }


}



export default Casefiles