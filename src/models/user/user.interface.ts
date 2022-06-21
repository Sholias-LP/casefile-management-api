import { Types } from 'mongoose';

interface IUser {
    _id: Types.ObjectId;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    hash: string;  
    avatar: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export default IUser
