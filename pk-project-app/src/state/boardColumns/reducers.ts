import { IBoard } from "..";
import { EBoardActions, TBoardActions } from "./types";


const initialState: IBoard = {
    id: "",
    name: "",
    teamId: "",
    boardTypeId: ""
};

const boardReducer = (state = initialState, action: TBoardActions) => {
    switch(action.type) {
        case EBoardActions.SETBOARDSTATE:
            return action.payload.board;
            default:
                return state;
    }
}

export default boardReducer;