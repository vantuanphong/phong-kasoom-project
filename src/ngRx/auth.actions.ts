import { Action } from "@ngrx/store";

export const SAVE_TOKEN = '[Auth] SaveToken'
export const DELETE_TOKEN = '[Auth] DeleteToken'

export class ActionParent implements Action {
    type:any;
    payload?:any;
}

export class SaveToken implements ActionParent {
    readonly type = SAVE_TOKEN
    constructor(public payload:any){}
}

export class DeleteToken implements ActionParent {
    readonly type = DELETE_TOKEN
}

export type ALL
 = SaveToken
 | DeleteToken
 