import { IColumn } from "..";
import { EColumnActions, TColumnActions } from "./types";


const initialState: IColumn = {
    id: "",
    title: "",
    position: 0,
    boardId: "",
    cards: []
};

const columnReducer = (state = initialState, action: TColumnActions) => {
    switch(action.type) {
        case EColumnActions.SETCOLUMNSTATE:
            return action.payload.column;
            default:
                return state;
    }
}

export default columnReducer;