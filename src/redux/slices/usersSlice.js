import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    userLogin: {
      userId: 0,
      username: "",
      token: "",
      userRole: "Patient",
    },
    userRegisterForm: {
      name: "",
      surname: "",
      idNumber: "",
      birthDate: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      terms: false,
      ipAddress: 0,
    },
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserLogin: (state, action) => {
      state.userLogin = action.payload;
    },
    setUserRegisterForm: (state, action) => {
      state.userRegisterForm = action.payload;
    },
  },
});

export const { setUserId, setUserLogin, setUserRegisterForm } =
  usersSlice.actions;

export default usersSlice.reducer;
