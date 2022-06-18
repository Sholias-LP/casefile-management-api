import { Schema, model} from 'mongoose'
import ICasefile from './casefile.interface'

const casefileSchema = new Schema<ICasefile>({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    casefile_id: {
        type: String,
        required: true,
        unique: true
    },
    case_type: {
        type: String,
        required: [true, 'Casefile type is required'],
        lowercase: true,
    },
    client: {
        type: String,
        required: [true, 'Client\'s name is required'],
        trim: true
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        lowercase: true,
    },
    occupation: {
        type: String,
        trim: true,
        lowercase: true
    },
    brief: {
        type: String,
        trim: true
    },
    letter_of_engagement: {
        type: String
    },
    service_fee: {
        type: Number
    },
    deposit: {
        type: [Number]
    },
    expenses: [{
        amount: Number,
        description: String
    }],
    court_sitting: [{
        date: String,
        description: String
    }],
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    isDeleted: {
        type: Boolean,
        default: false
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

export default model<ICasefile>('Casefile', casefileSchema)
