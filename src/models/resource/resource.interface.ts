import { Types } from 'mongoose';

interface IResourceCategory {
    _id: Types.ObjectId;
    name: string;
    type: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

export default IResourceCategory
