import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CURRENT_USER } from "../../Constants";
import fetcher from "../../API/fetcher";

export const loginAdmin = createAsyncThunk(
  "user/loginuser",
  async (payload) => {
    try {
      const response = await fetcher.post("/auth/signin", payload);

      localStorage.setItem(CURRENT_USER, JSON.stringify(response.data.content));
      return response.data.content;
    } catch (error) {
      throw alert("loi");
    }
  }
);

const initialState = {
  loading: false,
  user: localStorage.getItem(CURRENT_USER)
    ? JSON.parse(localStorage.getItem(CURRENT_USER))
    : null,
  error: null,
};

export const LoginUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogout: (state, { payload }) => {
      localStorage.removeItem(CURRENT_USER);
      state.user = undefined;
    },
    updateUser: (state, { payload }) => {
      console.log("state.user", state.user);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      });
  },
});

export const { reducer: UserReducer, actions: UserAction } = LoginUserSlice;
