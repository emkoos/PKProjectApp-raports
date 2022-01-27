import { ICard } from "..";
import { ECardActions, TCardActions } from "./types";


const initialState: ICard = {
    id: "",
    title: "",
    description: "",
    userEmail: "",
    columnId: "",
    statusId: "",
    createdDate: "",
    updatedStatusDoneDate: "",
    deadlineDate: "",
    priority: 0,
    estimate: 0,
    attachement: ""
};

const cardReducer = (state = initialState, action: TCardActions) => {
    switch(action.type) {
        case ECardActions.SETCARDSTATE:
            return action.payload.card;
            default:
                return state;
    }
}

export default cardReducer;