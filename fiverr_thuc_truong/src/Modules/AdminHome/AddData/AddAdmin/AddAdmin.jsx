import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { LocalizationProvider } from "@mui/x-date-pickers";
import {
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { registerAPI } from "../../../../API/AdminTechnique";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import * as yup from "yup";
import "../../../../Sass/admin/btnStyle.scss";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../Routes/path";

const schemaEdit = yup.object({
  name: yup.string().required("Vui Lòng Nhập Thông Tin"),
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
  phone: yup
    .string()
    .required("Vui Lòng Nhập Thông Tin")
    .matches(/^\d+$/, "Vui lòng nhập số"),
  birthday: yup.date().required("Vui lòng chọn ngày"),
  gender: yup.boolean().required("Vui Lòng Chọn giới tính"),
});

const AddAdmin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: "",
      role: "ADMIN",
      skill: [""],
      certification: [""],
    },
    mode: "all",
    resolver: yupResolver(schemaEdit),
  });
  //tanstack
  const { mutate: handleRegister, isPending } = useMutation({
    mutationFn: (values) => registerAPI(values),
    onSuccess: () => {
      reset(), navigate("/admin/manage-user");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Tạo Thành Công",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    
  });

  const onSubmit = (values) => {
    const result = handleRegister(values);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography
        sx={{ fontSize: "36px", fontWeight: "600" }}
        textAlign={"center"}
      >
        Add ADMIN
      </Typography>
      <Grid
        container
        spacing={3}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Name"
                    fullWidth
                    name="name"
                    {...field}
                    error={Boolean(errors.name)}
                    helperText={Boolean(errors.name) && errors.name.message}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Email"
                    fullWidth
                    name="email"
                    {...field}
                    error={Boolean(errors.email)}
                    helperText={Boolean(errors.email) && errors.email.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    {...field}
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
                    }}
                    error={Boolean(errors.password)}
                    helperText={
                      Boolean(errors.password) && errors.password.message
                    }
                  />
                )}
              />

              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Phone"
                    name="phone"
                    fullWidth
                    {...field}
                    error={Boolean(errors.phone)}
                    helperText={Boolean(errors.phone) && errors.phone.message}
                  />
                )}
              />

              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    name="gender"
                    label="Gender"
                    {...field}
                    onChange={(gen) => setValue("gender", gen.target.value)}
                  >
                    <MenuItem value={true}>Male</MenuItem>
                    <MenuItem value={false}>Female</MenuItem>
                  </TextField>
                )}
              />

              <Controller
                name="birthday"
                control={control}
                render={(field) => {
                  return (
                    <DatePicker
                      label="Birthday"
                      format="DD/MM/YYYY"
                      name="birthday"
                      onChange={(date) => {
                        setValue("birthday", date);
                      }}
                      {...field}
                    />
                  );
                }}
              />

              <LoadingButton
                sx={{ width: "180px" }}
                variant="contained"
                color="warning"
                size="large"
                type="submit"
                loading={isPending}
              >
                ADD
              </LoadingButton>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default AddAdmin;
