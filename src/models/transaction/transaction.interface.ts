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
    deposit: number[];
    expenses: any[];
    status: string;
    isDeleted: boolean
    createdAt: Date;
    updatedAt: Date;
}

export default ITransaction
