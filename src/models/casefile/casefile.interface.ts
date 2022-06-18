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
    deposit: number[];
    expenses: {}[];
    court_sitting: {}[];
    status: string;
    isDeleted: boolean
    createdAt: Date;
    updatedAt: Date;
}


export default ICasefile
