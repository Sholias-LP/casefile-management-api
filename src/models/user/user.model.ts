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
    avatar: {
        type: String,
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


userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt()
    this.hash = bcrypt.hashSync(this.hash, salt)    
    next()
})

const generateAvatar = (x: string, y: string) => {
    return `https://ui-avatars.com/api/?name=${x}+${y}&background=random&rounded=true&bold=false`
}

userSchema.post('save', async function(next) {
    this.avatar = generateAvatar(this.first_name, this.last_name)
})

export default model<IUser>('User', userSchema)
