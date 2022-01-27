import { IUser } from "..";

export enum EUserInfoActions {
    SETUSERSTATE = 'USER_INFO'
}

export interface IAddUserInfoAction {
    type: EUserInfoActions.SETUSERSTATE,
    payload: {
        userInfo: IUser
    }
}

export type TUserInfoActions = IAddUserInfoAction;