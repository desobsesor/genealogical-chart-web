import { BaseModel } from "./Basic.models";

export class Familiograma implements BaseModel {
    id!: string;
    name!: string;
    issueDate!: Date;
}

export interface Familiograma extends BaseModel {
    id: string;
    name: string;
    issueDate: Date;
}