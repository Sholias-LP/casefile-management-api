import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import IUser from './user.interface'

const userSchema = new Schema<IUser>({
    first_name: {
        type: String,
        required: [true, 'First name is required']
    },
    last_name: {
        type: String,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true
    },
    role: {
        type: String,
        enum: ['partner', 'associate'],
        default: 'partner',
        required: [true, 'Role is required'],
        lowercase: true
    },
    hash: {
        type: String,
        required: true
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

// userSchema.virtual('name').get(function() {
//     console.log(`Coming from the model ${this.first_name} ${this.last_name}`)
//     return `${this.first_name} ${this.last_name}`;
// });


userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt()
    this.hash = await bcrypt.hashSync(this.hash, salt)    
    next()
})

export default model<IUser>('User', userSchema)
