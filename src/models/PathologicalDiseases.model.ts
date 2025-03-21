import { BaseModel } from "./Basic.models";

export class PathologicalDiseases implements BaseModel {
    id!: string;
    name!: string;
    description!: string;
}

export interface PathologicalDiseases extends BaseModel {
    id: string;
    name: string;
    description: string;
}

