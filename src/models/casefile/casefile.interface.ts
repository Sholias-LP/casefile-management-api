import { Types } from 'mongoose'

interface ICasefile {
    _id: Types.ObjectId;
    author: string;
    casefile_id: string;
    case_type: string;
    client: string;
    gender: string;
    occupation: string;
    brief: string;
    email: string;
    letter_of_engagement: string;
    service_fee: number;
    deposit: {
        amount: number
    }[];
    expenses: {
        amount: number, 
        note: string
    }[];
    court_sitting: {
        date: string, 
        note: string
    }[];
    status: string;
    isDeleted: boolean;
    views: number;
    createdAt: Date;
    updatedAt: Date;
}


export default ICasefile
