import { Request, Response } from 'express'
import { BaseHandler } from '../interfaces/handler'
import { Types } from 'mongoose'
import ResourceCategoryModel from '../models/resource/resource.model'

interface IResourceDocument {
    _id: Types.ObjectId;
    name: string;
    type: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    save: any;
}

const getSlug = (string: string) => {
    return string.split(' ').join('_').toLowerCase()
}

class ResourceCategory extends BaseHandler {

    static async addAResourceCategory(req: Request, res: Response) {

        const { resourceName, resourceType } = req.body

        try {

            const newResourceCategory = new ResourceCategoryModel({
                name: resourceName,
                type: resourceType,
                slug: getSlug(resourceName)
            })

            await newResourceCategory.save().then((newResourceCategory: IResourceDocument) => {
                return res
                    .status(201)
                    .send({
                        success: true,
                        message: 'Resource Category added successfully',
                        data: newResourceCategory
                    })
            }).catch((err) => { throw new Error((err as Error).message) })
        } catch (error) {
            throw new Error((error as Error).message);
        }

    }


    static async getResourceCategories(req: Request, res: Response) {

        try {

            const transactionCategory = await ResourceCategoryModel.find({ type: 'transaction' })
            const casefileCategory = await ResourceCategoryModel.find({ type: 'casefile' })

            return res.status(200).send({
                success: true,
                count: [...casefileCategory, ...transactionCategory].length,
                data: {
                    casefiles: casefileCategory,
                    transactions: transactionCategory
                }
            })

        } catch (error) {
            throw new Error((error as Error).message);
        }

    }

}


export default ResourceCategory
