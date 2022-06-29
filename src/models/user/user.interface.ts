import { Types } from 'mongoose';

interface IUser {
    [x: string]: any;
    _id: Types.ObjectId;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    hash: string;  
    avatar: string;
    isDeleted: boolean;
    notification: string[];
    createdAt: Date;
    updatedAt: Date;
    map: any;
    save: any
}

export default IUser
