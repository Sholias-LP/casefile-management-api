import { Schema, model, Types } from 'mongoose'
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
        default: ''
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    notification: [{
        userId: Schema.Types.ObjectId,
        activity: String,
        resourceId: Schema.Types.ObjectId,
        date: Number,
        status: {type: String, enum: ['read', 'unread'], default: 'unread'}
    }],
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



const generateAvatar = (x: string, y: string) => {
    return `https://ui-avatars.com/api/?name=${x}+${y}&background=random&rounded=true&bold=false`
}

userSchema.post('save', async function(doc, next) {

    try {
        await doc
          .model('User')
          .updateOne({ _id: doc._id }, { avatar: generateAvatar(doc.first_name, doc.last_name) });
          this.avatar = generateAvatar(this.first_name, this.last_name)
      } catch (error: any) {
        next(error);
      }
    
    next()

})


export default model<IUser>('User', userSchema)
