export interface BaseModel {
    _id?: string;
    serial?: string;
    isActive?: boolean;
    deleted?: boolean,
    deletedAt?: Date,
    deletedBy?: string,
    editedAt?: Date;
    editedBy?: string;
    createdAt?: Date;
    createdBy?: string;
}

export class BaseModel {
    _id?: string;
    serial?: string;
    isActive?: boolean;
    deleted?: boolean;
    deletedAt?: Date;
    deletedBy?: string;
    editedAt?: Date;
    editedBy?: string;
    createdAt?: Date;
    createdBy?: string;
}