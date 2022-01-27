import { IColumn } from "..";

export enum EColumnActions {
    SETCOLUMNSTATE = 'SETCOLUMNSTATE'
}

export interface IAddColumnAction {
    type: EColumnActions.SETCOLUMNSTATE,
    payload: {
        column: IColumn
    }
}

export type TColumnActions = IAddColumnAction;