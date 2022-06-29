import { Schema, model } from 'mongoose'
import IResourceCategory from './resource.interface'

const resourceCategorySchema = new Schema<IResourceCategory>({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['casefile', 'transaction'],
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
})




export default model<IResourceCategory>('ResourceCategory', resourceCategorySchema)
