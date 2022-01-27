import { ILoggedIn } from "..";
import { ELoggedInActions, TLoggedInActions } from "./types";


const initialState: ILoggedIn = {
    loggedIn: false
};

const loggedInReducer = (state = initialState, action: TLoggedInActions) => {
    switch(action.type) {
        case ELoggedInActions.SETLOGGEDINSTATE:
            return action.payload.loggedIn;
        default:
            return state;
    }
}

export default loggedInReducer;