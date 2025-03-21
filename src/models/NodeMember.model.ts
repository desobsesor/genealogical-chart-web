import { RelationTypeCouple, RelationTypeMember } from "@/utils/enum";
import { BaseModel } from "./Basic.models";
import { Member } from "./Member.model";

export class NodeMember implements BaseModel {
    id!: string;
    type!: string;
    data!: Member;
    position!: { x: number; y: number; };
    draggable!: boolean;
    selectable!: boolean;
    relationType?: RelationTypeCouple | RelationTypeMember;
    submenuItems?: any;
    measured?: any;
    selected?: boolean;
    dragging?: boolean;
}

export interface NodeMember extends BaseModel {
    id: string;
    type: string;
    data: Member;
    position: { x: number, y: number };
    draggable: boolean;
    selectable: boolean;
    relationType?: RelationTypeCouple | RelationTypeMember;
    submenuItems?: any;
    measured?: any;
    selected?: boolean;
    dragging?: boolean;
}

