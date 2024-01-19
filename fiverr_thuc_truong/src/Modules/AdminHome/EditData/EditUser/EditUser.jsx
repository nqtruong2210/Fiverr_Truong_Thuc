import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LoadingButton } from "@mui/lab";
import dayjs from "dayjs";
import { UpdateUserData } from "../../../../API/AdminTechnique";
import Swal from "sweetalert2";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const schemaEdit = yup.object({
  id: yup
    .string()
    .required("Vui Lòng Nhập Thông Tin")
    .matches(/^\d+$/, "Vui lòng nhập số"),
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
const EditUser = ({ data }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues: {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      birthday: data.birthday,
      gender: data.gender,
      role: data.role,
      skill: data.skill,
      certification: data.certification,
    },
    mode: "all",
    resolver: yupResolver(schemaEdit),
  });

  //tanstack
  const { mutate: handleUpdate, isPending } = useMutation({
    mutationFn: (values) => UpdateUserData(values),
    onSuccess: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cập Nhật Thành Công",
        showConfirmButton: false,
        timer: 1500,
      }),
        navigate("/admin/manage-user");
    },
    onError: () => {
      alert("loi~vai");
    },
  });
  const onSubmit = (values) => {
    const result = handleUpdate(values);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography
        sx={{ fontSize: "36px", fontWeight: "600" }}
        textAlign={"center"}
      >
        Edit Data User
      </Typography>
      <Grid
        container
        spacing={3}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Controller
                name="id"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="ID"
                    {...field}
                    disabled
                    error={Boolean(errors.id)}
                    helperText={Boolean(errors.id) && errors.id.message}
                  />
                )}
              />
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
                    disabled
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
                    defaultValue={data.gender}
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
                defaultValue={dayjs(data.birthday)}
                render={(field) => {
                  return (
                    <DatePicker
                      label="Birthday"
                      format="DD/MM/YYYY"
                      defaultValue={dayjs(data.birthday)}
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
                variant="contained"
                fullWidth
                color="warning"
                size="large"
                type="submit"
                loading={isPending}
              >
                Update
              </LoadingButton>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default EditUser;
