import { ILoggedIn } from "..";
import { ELoggedInActions, IAddLoggedInAction } from "./types";

export const setLoggedIn = (loggedIn: ILoggedIn): IAddLoggedInAction => {
    return {
        type: ELoggedInActions.SETLOGGEDINSTATE,
        payload: { loggedIn }
    };
}