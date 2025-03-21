import { BaseModel } from "./Basic.models";

export class MemberEvent implements BaseModel {
    id!: string;
    name!: string;
    issueDate!: Date;
    icon?: any;
}

export interface MemberEvent extends BaseModel {
    id: string;
    name: string;
    issueDate: Date;
    icon?: any;
}

