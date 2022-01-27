import { IToken } from "..";
import { ETokenActions, TTokenActions } from "./types";


const initialState: IToken = {
    token: ""
};

const tokenReducer = (state = initialState, action: TTokenActions) => {
    switch(action.type) {
        case ETokenActions.SETTOKENSTATE:
            return action.payload.token;
        default:
            return state;
    }
}

export default tokenReducer;