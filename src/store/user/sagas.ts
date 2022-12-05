import Axios, { AxiosError } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
    fetchTargetUserData,
    fetchTargetUserDataFailed,
    fetchUserData,
    fetchUserDataFailed
} from "./reducer";
import { sagaActions } from "./sagaActions";
import { IAddUserSagaAction, IDeleteUserSagaAction, IEditUserSagaAction, IfetchTargetUserSagaAction, IUser } from "./types";

const apiBaseUrl = "http://localhost:4000/users"

// get users
const getUsers = async (url: string) => await Axios.get<IUser>(url);
function* fetchUserSaga() {
    try {
        let { data } = yield call(getUsers, apiBaseUrl);
        yield put(fetchUserData(data));
    } catch (error) {
        const e = error as AxiosError
        yield put(fetchUserDataFailed(e.message));
    }
}
function* fetchTargetUserSaga(action: IfetchTargetUserSagaAction) {
    const id = action.payload
    try {
        let { data } = yield call(getUsers, apiBaseUrl + '/' + id);
        yield put(fetchTargetUserData(data));
    } catch (error) {
        const e = error as AxiosError
        yield put(fetchTargetUserDataFailed(e.message));
    }
}

// Edit user
const editUser = async (url: string, user: IUser) => await Axios.put<IUser>(url, user);

function* editUserSaga(action: IEditUserSagaAction) {
    const user = action.payload
    try {
        yield call(editUser, apiBaseUrl + '/' + user.id, user);
        yield put({
            type: sagaActions.FETCH_USER_SAGA
        });
    } catch (error) {
        const e = error as AxiosError
        yield put(fetchUserDataFailed(e.message));
    }
}

// add user
const addUser = async (url: string, user: IUser) => await Axios.post<IUser>(url, user);

function* addUserSaga(action: IAddUserSagaAction) {
    const user = action.payload
    try {
        yield call(addUser, apiBaseUrl, user);
        yield put({
            type: sagaActions.FETCH_USER_SAGA
        });
    } catch (error) {
        const e = error as AxiosError
        yield put(fetchUserDataFailed(e.message));
    }
}

// delete user
const deletUser = async (url: string) => await Axios.delete<IUser>(url);

function* deleteUserSaga(action: IDeleteUserSagaAction) {
    const id = action.payload
    try {
        yield call(deletUser, apiBaseUrl + `/${id}`);
        yield put({
            type: sagaActions.FETCH_USER_SAGA
        });
    } catch (error) {
        const e = error as AxiosError
        yield put(fetchUserDataFailed(e.message));
    }
}

function* userSaga() {
    yield all([
        takeLatest(sagaActions.FETCH_USER_SAGA, fetchUserSaga),
        takeLatest(sagaActions.FETCH_TARGET_USER_SAGA, fetchTargetUserSaga),
        takeLatest(sagaActions.EDIT_USER_SAGA, editUserSaga),
        takeLatest(sagaActions.DELETE_USER_SAGA, deleteUserSaga),
        takeLatest(sagaActions.ADD_USER_SAGA, addUserSaga),
    ]);
}

export default userSaga;