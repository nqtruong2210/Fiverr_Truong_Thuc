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

const AddAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
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
  });
  //tanstack
  const { mutate: handleRegister, isPending } = useMutation({
    mutationFn: (values) => registerAPI(values),
    onSuccess: () => {},
    onError: () => {
      alert("loi~vai");
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
        <Grid item lg={6}>
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
                defaultValue={""}
              >
                <MenuItem value={true}>Male</MenuItem>
                <MenuItem value={false}>Female</MenuItem>
              </TextField>
              <Controller
                name="birthday"
                control={control}
                render={(field) => {
                  return (
                    <DatePicker
                      label="Birthday"
                      format="DD/MM/YYYY"
                      views={["day", "month", "year"]}
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
