import { IToken } from "..";
import { ETokenActions, IAddTokenAction } from "./types";

export const setToken = (token: IToken): IAddTokenAction => {
    return {
        type: ETokenActions.SETTOKENSTATE,
        payload: { token }
    };
}