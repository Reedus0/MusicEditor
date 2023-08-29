import { AuthActionEnum, SetAuthAction, SetUserAction } from "./types";
import { IUser } from "../../../models/IUser";

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({ type: AuthActionEnum.SET_USER, payload: user }),
    setIsAuth: (auth: boolean): SetAuthAction => ({ type: AuthActionEnum.SET_AUTH, payload: auth }),
}