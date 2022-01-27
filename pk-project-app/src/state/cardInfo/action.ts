import { ICard } from "..";
import { ECardActions, IAddCardAction } from "./types";

export const setCard = (card: ICard): IAddCardAction => {
    return {
        type: ECardActions.SETCARDSTATE,
        payload: { card }
    };
}