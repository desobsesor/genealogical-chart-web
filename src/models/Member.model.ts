import { Position } from "@xyflow/react";
import { CurrentStatus, Gen, Gender, Rol } from "../utils/enum";
import { BaseModel } from "./Basic.models";
import { PathologicalDiseases } from "./PathologicalDiseases.model";
import { MemberEvent } from "./MemberEvent.model";

export class Member implements BaseModel {
    id!: string;
    name!: string;
    rol!: Rol;
    icon: any;
    positionSource!: Position;
    positionTarget!: Position;
    gender!: Gender;
    age!: number;
    dead?: boolean;
    gen!: Gen;
    indice?: boolean;
    inGestation?: boolean;
    miscarriage?: boolean;
    abortion?: boolean;
    pathologicalDiseases?: PathologicalDiseases[];
    currentStatus?: CurrentStatus;
    events?: MemberEvent[];
    occupation?: string;
    avatar?: string;
}

export interface Member extends BaseModel {
    id: string;
    name: string;
    rol: Rol;
    icon: any;
    positionSource: Position;
    positionTarget: Position;
    gender: Gender;
    age: number;
    dead?: boolean;
    gen: Gen;
    indice?: boolean;
    inGestation?: boolean;
    miscarriage?: boolean;
    abortion?: boolean;
    pathologicalDiseases?: PathologicalDiseases[];
    currentStatus?: CurrentStatus;
    events?: MemberEvent[];
    occupation?: string;
    avatar?: string;
}

