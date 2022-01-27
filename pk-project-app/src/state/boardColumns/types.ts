import { IBoard } from "..";

export enum EBoardActions {
    SETBOARDSTATE = 'SETBOARDSTATE'
}

export interface IAddBoardAction {
    type: EBoardActions.SETBOARDSTATE,
    payload: {
        board: IBoard
    }
}

export type TBoardActions = IAddBoardAction;