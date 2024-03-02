import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Grid, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { addServices } from "../../../../API/AdminTechnique";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../Routes/path";

const schemaEdit = yup.object({
  maCongViec: yup
    .string()
    .required("Vui Lòng Nhập Thông Tin")
    .matches(/^\d+$/, "Vui lòng nhập số"),
  maNguoiThue: yup
    .string()
    .required("Vui Lòng Nhập Thông Tin")
    .matches(/^\d+$/, "Vui lòng nhập số"),

  ngayThue: yup.date().required("Vui Lòng Chọn Ngày"),
});
const AddServices = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      maCongViec: 0,
      maNguoiThue: 0,
      ngayThue: "",
      hoanThanh: false,
    },
    mode: "all",
    resolver: yupResolver(schemaEdit),
  });

  //tanstack
  const { mutate: handleAddServices, isPending } = useMutation({
    mutationKey: "addService",
    mutationFn: (values) => addServices(values),
    onSuccess: () => {
      reset(), navigate("/admin/manage-services");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cập Nhật Thành Công",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  //
  const onSubmit = (values) => {
    console.log("values", values);
    const result = handleAddServices(values);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography
        sx={{ fontSize: "36px", fontWeight: "600" }}
        textAlign={"center"}
      >
        Add Services
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
                name="maCongViec"
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      name="maCongViec"
                      label="Code Job"
                      {...field}
                      error={Boolean(errors.maCongViec)}
                      helperText={
                        Boolean(errors.maCongViec) && errors.maCongViec.message
                      }
                    />
                  );
                }}
              />

              <Controller
                name="maNguoiThue"
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      name="maNguoiThue"
                      label="Code Renter"
                      {...field}
                      error={Boolean(errors.maNguoiThue)}
                      helperText={
                        Boolean(errors.maNguoiThue) &&
                        errors.maNguoiThue.message
                      }
                    />
                  );
                }}
              />

              <Controller
                name="ngayThue"
                control={control}
                render={(field) => {
                  return (
                    <DatePicker
                      label="Date Of Hire"
                      format="DD/MM/YYYY"
                      onChange={(date) => {
                        setValue("ngayThue", date);
                      }}
                      {...field}
                      error={Boolean(errors.ngayThue)}
                      helperText={
                        Boolean(errors.ngayThue) && errors.ngayThue.message
                      }
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

export default AddServices;
