import { IUser } from "..";
import { EUserInfoActions, IAddUserInfoAction } from "./types";

export const setUserInfo = (userInfo: IUser): IAddUserInfoAction => {
    return {
        type: EUserInfoActions.SETUSERSTATE,
        payload: { userInfo }
    };
}