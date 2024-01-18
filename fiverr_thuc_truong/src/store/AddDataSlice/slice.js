import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenAddAdmin: false,
  isOpenAddJob: false,
  isOpenAddJobStyle: false,
  isOpenAddServices: false,
  isOpenAddJobDetails: false,
  isOpenAddComment: false,
};

export const addDataSlice = createSlice({
  name: "add",
  initialState,
  reducers: {
    setOpenAddJob: (state, { payload }) => {
      state.isOpenAddAdmin = false;
      state.isOpenAddJob = true;
      state.isOpenAddJobStyle = false;
      state.isOpenAddServices = false;
      state.isOpenAddJobDetails = false;
      state.isOpenAddComment = false;
    },
    setOpenAddUser: (state, { payload }) => {
      state.isOpenAddAdmin = true;
      state.isOpenAddJob = false;
      state.isOpenAddJobStyle = false;
      state.isOpenAddServices = false;
      state.isOpenAddJobDetails = false;
      state.isOpenAddComment = false;
    },
    setOpenAddJobStyle: (state, { payload }) => {
      state.isOpenAddAdmin = false;
      state.isOpenAddJob = false;
      state.isOpenAddJobStyle = true;
      state.isOpenAddServices = false;
      state.isOpenAddJobDetails = false;
      state.isOpenAddComment = false;
    },
    setOpenAddJobDetails: (state, { payload }) => {
      state.isOpenAddAdmin = false;
      state.isOpenAddJob = false;
      state.isOpenAddJobStyle = false;
      state.isOpenAddServices = false;
      state.isOpenAddJobDetails = true;
      state.isOpenAddComment = false;
    },
    setOpenAddServices: (state, { payload }) => {
      state.isOpenAddAdmin = false;
      state.isOpenAddJob = false;
      state.isOpenAddJobStyle = false;
      state.isOpenAddServices = true;
      state.isOpenAddJobDetails = false;
      state.isOpenAddComment = false;
    },
    setOpenAddComments: (state, { payload }) => {
      state.isOpenAddAdmin = false;
      state.isOpenAddJob = false;
      state.isOpenAddJobStyle = false;
      state.isOpenAddServices = false;
      state.isOpenAddJobDetails = false;
      state.isOpenAddComment = true;
    },
  },
});

export const { reducer: AddDataReducer, actions: AddDataActions } =
  addDataSlice;
