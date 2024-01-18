import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isOpenEditUser: false,
  isOpenEditJob: false,
  isOpenEditJobStyle: false,
  isOpenEditJobDetails: false,
  isOpenEditServices: false,
  isOpenEditComment: false,
};

export const editData = createSlice({
  name: "edit",
  initialState,
  reducers: {
    setEditUser: (state, { payload }) => {
      state.data = { ...payload };
      state.isOpenEditUser = true;
      state.isOpenEditJob = false;
      state.isOpenEditJobStyle = false;
      state.isOpenEditJobDetails= false,
      state.isOpenEditServices = false;
      state.isOpenEditComment = false;
    },
    setEditJob: (state, { payload }) => {
      state.data = { ...payload };
      state.isOpenEditUser = false;
      state.isOpenEditJob = true;
      state.isOpenEditJobStyle = false;
      state.isOpenEditJobDetails= false,
      state.isOpenEditServices = false;
      state.isOpenEditComment = false;
    },
    setEditJobStyle: (state, { payload }) => {
      state.data = { ...payload };
      state.isOpenEditUser = false;
      state.isOpenEditJob = false;
      state.isOpenEditJobStyle = true;
      state.isOpenEditJobDetails= false,
      state.isOpenEditServices = false;
      state.isOpenEditComment = false;
    },
    setEditJobDetails: (state, { payload }) => {
      state.data = { ...payload };
      state.isOpenEditUser = false;
      state.isOpenEditJob = false;
      state.isOpenEditJobStyle = false;
      state.isOpenEditJobDetails= true,
      state.isOpenEditServices = false;
      state.isOpenEditComment = false;
    },
    setEditJobServices: (state, { payload }) => {
      state.data = { ...payload };
      state.isOpenEditUser = false;
      state.isOpenEditJob = false;
      state.isOpenEditJobStyle = false;
      state.isOpenEditJobDetails= false,
      state.isOpenEditServices = true;
      state.isOpenEditComment = false;
    },
    setEditJobComment: (state, { payload }) => {
      state.data = { ...payload };
      state.isOpenEditUser = false;
      state.isOpenEditJob = false;
      state.isOpenEditJobStyle = false;
      state.isOpenEditJobDetails= false,
      state.isOpenEditServices = false;
      state.isOpenEditComment = true;
    },
    setEditClose: (state, { payload }) => {
      state.data = { ...payload };
      state.isOpenEditUser = false;
      state.isOpenEditJob = false;
      state.isOpenEditJobStyle = false;
      state.isOpenEditJobDetails= false,
      state.isOpenEditServices = false;
      state.isOpenEditComment = false;
    },
  },
});

export const { reducer: EditDataReducer, actions: EditDataActions } = editData;
