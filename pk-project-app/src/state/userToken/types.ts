import { IToken } from "..";

export enum ETokenActions {
    SETTOKENSTATE = 'TOKEN'
}

export interface IAddTokenAction {
    type: ETokenActions.SETTOKENSTATE,
    payload: {
        token: IToken
    }
}

export interface ITokenAction {
    token: IToken
}

export type TTokenActions = IAddTokenAction;