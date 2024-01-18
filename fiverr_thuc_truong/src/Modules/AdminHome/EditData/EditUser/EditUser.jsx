import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Grid, IconButton, InputAdornment, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LoadingButton } from "@mui/lab";
import dayjs from "dayjs";
import { UpdateUserData } from "../../../../API/AdminTechnique";

const EditUser = ({data}) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
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
  });

  //tanstack
  const { mutate: handleUpdate, isPending } = useMutation({
    mutationFn: (values) => UpdateUserData(values),
    onSuccess: () => {
      queryClient.invalidateQueries(["LIST_USER_PAGINATION"]);
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
        <Grid item >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <TextField
                label="Name"
                fullWidth
                name="name"
                {...register("name")}
              />

              <TextField
                label="Email"
                fullWidth
                name="email"
                {...register("email")}
                disabled
              />

              <TextField
                label="Password"
                name="password"
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
                }}
              />

              <TextField
                label="Phone"
                name="phone"
                fullWidth
                {...register("phone")}
              />

              <TextField
                select
                name="gender"
                label="Gender"
                {...register("gender")}
                defaultValue={data.gender}
              >
                <MenuItem value={true}>Male</MenuItem>
                <MenuItem value={false}>Female</MenuItem>
              </TextField>
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
