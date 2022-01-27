import { ILoggedIn } from "..";

export enum ELoggedInActions {
    SETLOGGEDINSTATE = 'SETLOGGEDINSTATE'
}

export interface IAddLoggedInAction {
    type: ELoggedInActions.SETLOGGEDINSTATE,
    payload: {
        loggedIn: ILoggedIn
    }
}

export type TLoggedInActions = IAddLoggedInAction;