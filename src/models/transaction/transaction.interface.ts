import { Types } from 'mongoose';

interface ITransaction {
    _id: Types.ObjectId;
    author: string;
    transaction_id: string;
    transaction_type: string;
    client: string;
    gender: string;
    occupation: string;
    transaction_summary: string;
    service_fee: number;
    deposit: {
        amount: number
    }[];
    expenses: {
        amount: number, 
        note: string
    }[];
    status: string;
    isDeleted: boolean;
    views: number;
    createdAt: Date;
    updatedAt: Date;
}

export default ITransaction
