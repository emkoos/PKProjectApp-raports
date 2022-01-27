import { IBoard } from "..";
import { EBoardActions, IAddBoardAction } from "./types";

export const setBoard = (board: IBoard): IAddBoardAction => {
    return {
        type: EBoardActions.SETBOARDSTATE,
        payload: { board }
    };
}