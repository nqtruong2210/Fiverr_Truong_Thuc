import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../../../../Sass/admin/baseStyle.scss";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import DraftsIcon from "@mui/icons-material/Drafts";
import HttpsIcon from "@mui/icons-material/Https";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import style from "./login.module.scss";
import { loginAdmin } from "../../../../store/LoginAdminSlice/slice";
import { PATH } from "../../../../Routes/path";
import Swal from "sweetalert2";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";

const schemaEdit = yup.object({
  email: yup
    .string()
    .email("Vui Lòng Nhập Đúng Định Dạng Mail")
    .required("Vui Lòng Nhập Thông Tin"),

  password: yup
    .string()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password phải có ít nhất 12 ký tự gồm 1 ký tự viết hoa, 1 ký tự thường, 1 ký tự số, 1 ký tự đặc biệt"
    )
    .required("Vui Lòng Nhập Thông Tin"),
});
const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => {
            return {
              ".MuiOutlinedInput-notchedOutline": {
                borderWidth: "1.8px",
              },
              "& fieldset": {
                borderColor: "black !important",
              },
            };
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: ({ theme }) => {
            return {
              color: "black!Important",
            };
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) => {
            return {
              color: "black",
              background: "white",
              fontSize: "1.2rem",
              fontWeight: "600",
              "&:hover": {
                background: "pink",
              },
            };
          },
        },
      },
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver: yupResolver(schemaEdit),
  });
  const onSubmit = (values) => {
    dispatch(loginAdmin(values)).then((result) => {
      console.log("result", result);
      if (result.payload?.user.role === "ADMIN") {
        navigate("/admin");
      }
      if (result.payload?.user.role === "USER") {
        Swal.fire({
          title: "This is Admin Page",
          icon: "info",
          html: `
          Please switch to Client Page, <a href="/"><b>Click here.</b></a>
          `,
          focusConfirm: false,
          cancelButtonAriaLabel: "Thumbs down",
        });
        localStorage.clear(CURRENT_USER);
      }
      if (result.payload === undefined) {
        messageApi.open({
          type: "error",
          content: "Tài khoản hoặc mật khẩu sai",
        });
      }
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <Box
        className={style.loginBg}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid
          container
          justifyContent={"space-between"}
          alignItems={"center"}
          className={style.loginBox}
          width={"80%"}
          padding={"6% 3%"}
        >
          <Grid
            item
            sx={{
              display: {
                xs: "none",
                md: "inline-block",
              },
            }}
            md={5}
          >
            <Typography variant="h3" textAlign={"center"} paddingBottom={3}>
              WelCome!
            </Typography>
            <Typography textAlign={"center"}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla
              quas dolorum facilis, distinctio labore, quae amet error iste
              praesentium, vel ut id unde tempora ex qui non nemo a repellendus!
            </Typography>
          </Grid>

          <Grid
            item
            md={5}
            xs={10}
            sx={{
              boxShadow:
                "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
              padding: 3,
              height: 360,
              margin: { xs: "auto", md: 0 },
            }}
          >
            <Typography
              sx={{ fontSize: "36px", fontWeight: "600", marginBottom: 3 }}
              textAlign={"center"}
            >
              Log In
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack
                spacing={3}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <TextField
                  autoComplete="off"
                  className={style.textField}
                  label="Email"
                  fullWidth
                  {...register("email")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DraftsIcon />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: "3vmax", fontSize: "1.2rem" },
                  }}
                  placeholder="Email..."
                  error={Boolean(errors.email)}
                  helperText={Boolean(errors.email) && errors.email.message}
                />
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  {...register("password")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position="start" disableTypography={true}>
                        <HttpsIcon />
                      </InputAdornment>
                    ),
                    style: { borderRadius: "3vmax" },
                  }}
                  placeholder="Password..."
                  sx={{ borderRadius: "3vmax" }}
                  error={Boolean(errors.password)}
                  helperText={
                    Boolean(errors.password) && errors.password.message
                  }
                />
                <LoadingButton
                  type="submit"
                  variant="contained"
                  sx={{ width: "81%", borderRadius: "3vmax" }}
                >
                  Login
                </LoadingButton>
                
              </Stack>
            </form>
            {contextHolder}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default AdminLogin;
