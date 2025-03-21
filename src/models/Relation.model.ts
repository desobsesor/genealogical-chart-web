import { RelationTypeCouple, RelationTypeMember } from "../utils/enum";
import { BaseModel } from "./Basic.models";

export class Relation implements BaseModel {
    id!: string;
    source!: string;
    target!: string;
    animated!: boolean;
    label!: string;
    type!: string;
    data!: {
        relationType: RelationTypeCouple | RelationTypeMember;
    };
}

export interface Relation extends BaseModel {
    id: string;
    source: string;
    target: string;
    animated: boolean;
    label: string;
    type: string;
    data: {
        relationType: RelationTypeCouple | RelationTypeMember; // {'Matrimonio', 'Separacion','Divorcio','Convivientes' }, {""}
    }
}