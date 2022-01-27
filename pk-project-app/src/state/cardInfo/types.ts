import { ICard } from "..";

export enum ECardActions {
    SETCARDSTATE = 'SETCARDSTATE'
}

export interface IAddCardAction {
    type: ECardActions.SETCARDSTATE,
    payload: {
        card: ICard
    }
}

export type TCardActions = IAddCardAction;