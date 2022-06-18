import { Request, Response } from 'express'
import { BaseHandler } from '../interfaces/handler'
import CasefileModel from '../models/casefile/casefile.model'
// import { v4 as uuidv4 } from 'uuid';
import { QueryOptions, Types } from 'mongoose'

interface ICasefileDocument {
    save: any;
    casefile_id: string;
    casefile_type: string;
    client: string;
    gender: string;
    occupation: string;
    brief: string;
    letter_of_engagement: string;
    service_fee: number;
    deposit: number[];
    expenses: any[];
    court_sitting: any[];
    createdAt: Date;
    updatedAt: Date;
    limit: any;
    skip: any
}

function alphanumeric_unique() {
    return Math.random().toString(36).split('').filter(function (value, index, self) {
        return self.indexOf(value) === index;
    }).join('').substr(2, 5);
}

class Casefiles extends BaseHandler {

    // Add a new Casefile
    static async addACasefile(req: Request, res: Response) {

        try {

            const { caseType, client, gender, occupation, brief, letterOfEngagement, serviceFee, deposit, expenses, courtSitting } = req.body

            const newCasefile = new CasefileModel({
                author: res.locals.user._id,
                casefile_id: `#${alphanumeric_unique()}`,
                case_type: caseType,
                client: client,
                gender: gender,
                occupation: occupation,
                brief: brief,
                letter_of_engagement: letterOfEngagement,
                service_fee: serviceFee,
                deposit: deposit,
                expenses: expenses,
                court_sitting: courtSitting
            })

            await newCasefile.save().then((newCasefile) => {
                return res
                    .status(201)
                    .send({
                        success: true,
                        message: 'Casefile added successfully',
                        data: newCasefile
                    })
            }).catch((err) => { throw new Error((err as Error).message) })
        } catch (error) {
            throw new Error((error as Error).message);
        }

    }



    // Get all casefiles
    static async getAllCasefiles(req: Request, res: Response) {

        const { caseType, client, author } = req.query
        const filters = { isDeleted: false }

        if (caseType) (filters as any).case_type = caseType
        if (client) (filters as any).client = client
        if (author) (filters as any).author = (author as QueryOptions)

        try {

            CasefileModel.find(filters).then((casefiles) => {
                return res.status(200).send({
                    success: true,
                    message: 'Casefiles retrieved successfully',
                    count: casefiles.length,
                    data: casefiles
                })
            })

        } catch (error) {
            throw new Error((error as Error).message);
        }
    }


    // Get a specific casefile
    static getACasefile(req: Request, res: Response) {

        try {
            const { id } = req.params

            if (Types.ObjectId.isValid(id)) {
                CasefileModel.find({ _id: id })
                    .then((casefile) => {
                        if (!casefile) {
                            return res.status(404).send({
                                success: false,
                                message: 'Casefile not found'
                            })
                        } else {
                            return res.status(200).send({
                                success: true,
                                message: 'Casefile retrieved successfully',
                                data: casefile
                            })
                        }
                    })
            } else {
                return res.status(404).send({ success: false, message: 'Invalid Id' })
            }
        } catch (error) {
            throw new Error((error as Error).message);
        }

    }



    // Update a casefile
    static updateACasefile(req: Request, res: Response) {

        try {
            const casefileId = req.params.id
            const { caseID, casefileType, client, gender, occupation, brief, letterOfEngagement, serviceFee, deposit, expenses, courtSitting } = req.body

            if (Types.ObjectId.isValid(casefileId)) {

                CasefileModel.findById({ _id: casefileId }, (error: Error, document: ICasefileDocument) => {
                    if (error) return res.send({ success: false, message: 'Update failed: ' + error })

                    if (document) {

                        document.casefile_id = caseID || document.casefile_id,
                            document.casefile_type = casefileType || document.casefile_type,
                            document.client = client || document.client,
                            document.gender = gender || document.gender,
                            document.occupation = occupation || document.occupation,
                            document.brief = brief || document.brief,
                            document.letter_of_engagement = letterOfEngagement || document.letter_of_engagement,
                            document.service_fee = serviceFee || document.service_fee
                        document.deposit = deposit || document.deposit
                        document.expenses = expenses || document.expenses
                        document.court_sitting = courtSitting || document.court_sitting

                        document.save().then((casefile: ICasefileDocument) => {
                            return res.status(200).send({
                                success: true,
                                message: 'Casefile Updated Successfully',
                                data: casefile
                            })
                        }).catch((error: Error) => {
                            throw new Error(error.message);
                        })
                    } else {
                        return res.status(404).send(
                            {
                                success: false,
                                message: 'Casefile not found'
                            })
                    }
                })
            } else {
                return res.status(404).send(
                    {
                        success: false,
                        message: 'Invalid ID'
                    })
            }
        } catch (error) {
            throw new Error((error as Error).message);
        }

    }


    // Delete a casefile
    static async deleteACasefile(req: Request, res: Response) {

        try {

            const casefileId = req.params.id

            if (Types.ObjectId.isValid(casefileId)) {
                const casefile = await CasefileModel.findByIdAndDelete(casefileId)

                if (!casefile) {
                    return res.status(404).send({
                        success: false,
                        message: 'Casefile not found.'
                    })
                } else {
                    return res.status(200).send({
                        success: true,
                        message: 'Casefile Successfully Deleted'
                    })
                }
            } else {
                return res.status(404).send({
                    success: false,
                    message: 'Invalid ID'
                })
            }


        } catch (error) {
            throw new Error((error as Error).message);
        }

    }

}


export default Casefiles
