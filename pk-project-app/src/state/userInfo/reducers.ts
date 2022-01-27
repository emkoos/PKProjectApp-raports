import { IUser } from "..";
import { EUserInfoActions, TUserInfoActions } from "./types";


const initialState: IUser = {
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    photo: "",
    userTeams: [],
    comments: [],
    cards: []
};

const infoUserReducer = (state = initialState, action: TUserInfoActions) => {
    switch(action.type) {
        case EUserInfoActions.SETUSERSTATE:
            return action.payload.userInfo;
            default:
                return state;
    }
}

export default infoUserReducer;