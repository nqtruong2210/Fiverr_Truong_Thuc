import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { UserAction } from "../../../store/LoginAdminSlice/slice";
import { UpdateProfileData, uploadAvatar } from "../../../API/AdminTechnique";


const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const Profile = () => {
  const { user } = useSelector((state) => state.User);
  console.log("user", user);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { handleSubmit, register, control, setValue, watch } = useForm({
    defaultValues: {
      id: user?.user.id,
      name: user?.user.name,
      email: user?.user.email,
      phone: user?.user.phone,
      birthday: user?.user.birthday,
      gender: user?.user.gender,
      role: user?.user.role,
      skill: user?.user.skill,
      certification: user?.user.certification,
      bookingJob: user?.user.bookingJob,
      formFile: undefined,
    },
  });

  const { mutate: handleUpdate, isPending } = useMutation({
    mutationFn: (values) => UpdateProfileData(values),
    onSuccess: () => {
      dispatch(UserAction.setLogout());
      navigate("/admin-login");
    },
    onError: () => {
      alert("loi~vai");
    },
  });

  const { mutate: handleUploadAvatar } = useMutation({
    mutationFn: (payload) => uploadAvatar(payload),
    onSuccess: () => {
      dispatch(UserAction.setLogout());
      navigate("/admin-login");
    },
  });

  const file = watch("formFile");

  const previewIMG = (file) => {
    return URL.createObjectURL(file);
  };
  const onSubmit = async (values) => {
    const updateData = { ...values };
    delete updateData.formFile;
    if (values.formFile.length > 0) {
      const formData = new FormData();
      formData.append("formFile", values.formFile[0]);

      handleUploadAvatar(formData);
    }
    const result = handleUpdate(updateData);
  };

  return (
    <Grid container direction={"column"}>
      <Grid
        item
        sx={{
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
          padding: 3,
        }}
        xs={12}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Typography
            sx={{ fontSize: "36px", fontWeight: "600" }}
            textAlign={"center"}
          >
            My Profile
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            {!file && (
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={user.user.avatar}
                    sx={{
                      width: "270px",
                      height: "270px",
                      textAlign: "center",
                      borderRadius: "3%",
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    sx={{ margin: 3 }}
                  >
                    Upload file
                    <VisuallyHiddenInput
                      type="file"
                      fullWidth
                      {...register("formFile")}
                      accept=".png,.gif,.jpg"
                    />
                  </Button>
                </Grid>
              </Grid>
            )}
            {file?.length > 0 && (
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={previewIMG(file[0])}
                    sx={{
                      width: "270px",
                      height: "270px",
                      textAlign: "center",
                      borderRadius: "3%",
                    }}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    sx={{ margin: 3 }}
                    onClick={() => {
                      setValue("formFile", undefined);
                    }}
                  >
                    Xoa Hinh
                  </Button>
                </Grid>
              </Grid>
            )}
            <Stack
              direction={"row"}
              useFlexGap
              flexWrap={"wrap"}
              spacing={3}
              justifyContent={"center"}
            >
              <TextField
                label="id"
                sx={{ width: "45%" }}
                name="id"
                {...register("id")}
                disabled
              />
              <TextField
                label="Name"
                sx={{ width: "45%" }}
                name="name"
                {...register("name")}
              />

              <TextField
                label="Email"
                sx={{ width: "45%" }}
                name="email"
                {...register("email")}
                disabled
              />
              <TextField
                label="Phone"
                name="phone"
                sx={{ width: "45%" }}
                {...register("phone")}
              />

              <TextField
                select
                name="gender"
                label="Gender"
                sx={{ width: "45%" }}
                {...register("gender")}
                defaultValue={user?.user.gender}
              >
                <MenuItem value={true}>Male</MenuItem>
                <MenuItem value={false}>Female</MenuItem>
              </TextField>
              <Controller
                name="birthday"
                control={control}
                defaultValue={dayjs(user?.user.birthday)}
                render={(field) => {
                  return (
                    <DatePicker
                      label="Birthday"
                      format="DD/MM/YYYY"
                      sx={{ width: "45%" }}
                      defaultValue={dayjs(user?.user.birthday)}
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
                sx={{ width: "45%" }}
                color="warning"
                size="large"
                type="submit"
                loading={isPending}
              >
                Update
              </LoadingButton>
            </Stack>
          </form>
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
};

export default Profile;
