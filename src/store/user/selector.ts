import { createSelector } from "reselect";

import { TAppState } from "../rootReducer";

const data = (state: TAppState) => state.user.data

export const userSelector = createSelector(data, (data) => data)
