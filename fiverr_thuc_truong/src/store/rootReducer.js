import { combineReducers } from "@reduxjs/toolkit";
import { UserReducer } from "./LoginAdminSlice/slice";
import { EditDataReducer } from "./EditdataSlice/slice";
import { AddDataReducer } from "./AddDataSlice/slice";
import { ShowDataReducer } from "./ShowDataSlice/slice";

export const rootReducer = combineReducers({
  // Add your reducers here.
  User: UserReducer,
  EditData: EditDataReducer,
  AddData: AddDataReducer,
  ShowData: ShowDataReducer,
});
