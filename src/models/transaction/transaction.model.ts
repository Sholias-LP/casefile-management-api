import { Schema, model } from 'mongoose'
import ITransaction from './transaction.interface'

const transactionSchema = new Schema<ITransaction>({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    transaction_id: {
        type: String,
        required: true,
        unique: true
    }, 
    transaction_type: {
        type: String,
        required: [true, 'Transaction type is required'],
        lowercase: true
    }, 
    client: {
        type: String,
        required: [true, 'Client\'s name is required']
    }, 
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        lowercase: true
    }, 
    occupation: {
        type: String,
        lowercase: true
    }, 
    transaction_summary: {
        type: String,
        trim: true
    }, 
    service_fee: {
        type: Number
    },
    deposit: {
        type: [Number],
        default: []
    },
    expenses: [{
        amount: Number,
        note: String
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



transactionSchema.post('save', async function(doc, next) {
    doc.transaction_id = `#${doc.transaction_id}`
    next()
})


transactionSchema.post('find', async function(doc, next) {

    doc.map((document: any) => {
        document.transaction_id = `#${document.transaction_id}`
    })
    next()

})

export default model<ITransaction>('Transaction', transactionSchema)
