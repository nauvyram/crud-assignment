import { sagaActions } from "./sagaActions"

export interface IUser {
    id?: number | string
    name: string
    username?: string
    email: string
    address: IAddress
    phone?: string
    website?: string
    company?: ICompany
}

export interface IAddress {
    street: string
    suite: string
    city: string
    zipcode: string
    geo?: IGeo
}

export interface IGeo {
    lat: string
    lng: string
}

export interface ICompany {
    name: string
    catchPhrase: string
    bs: string
}

export interface IUserState {
    status: string;
    data: IUser[];
    error: string | null;
    user: IUser | null
}

export interface IfetchTargetUserSagaAction {
    type: typeof sagaActions.FETCH_TARGET_USER_SAGA,
    payload: string
}
export interface IEditUserSagaAction {
    type: typeof sagaActions.EDIT_USER_SAGA,
    payload: IUser
}
export interface IAddUserSagaAction {
    type: typeof sagaActions.ADD_USER_SAGA,
    payload: IUser
}
export interface IDeleteUserSagaAction {
    type: typeof sagaActions.DELETE_USER_SAGA,
    payload: string | number
}