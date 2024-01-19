import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import {
  Box,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { LoadingButton } from "@mui/lab";
import { updateServices } from "../../../../API/AdminTechnique";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const schemaEdit = yup.object({
  id: yup
    .string()
    .required("Vui Lòng Nhập Thông Tin")
    .matches(/^\d+$/, "Vui lòng nhập số"),
  maCongViec: yup
    .string()
    .required("Vui Lòng Nhập Thông Tin")
    .matches(/^\d+$/, "Vui lòng nhập số"),
  maNguoiThue: yup
    .string()
    .required("Vui Lòng Nhập Thông Tin")
    .matches(/^\d+$/, "Vui lòng nhập số"),

  ngayThue: yup.date().required("Vui Lòng Chọn Ngày"),
  hoanThanh: yup.boolean().required("Vui Lòng Chọn Trạng Thái"),
});

const EditServices = ({ data }) => {

  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: data.id,
      maCongViec: data.maCongViec,
      maNguoiThue: data.maNguoiThue,
      ngayThue: data.ngayThue,
      hoanThanh: data.hoanThanh,
    },
    mode: "all",
    resolver: yupResolver(schemaEdit),
  });

  //tanstack
  const { mutate: handleUpdateServices, isPending } = useMutation({
    mutationKey: ["editData"],
    mutationFn: (values) => updateServices(values),
    onSuccess: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cập Nhật Thành Công",
        showConfirmButton: false,
        timer: 1500,
      }),
        navigate("/admin/manage-services");
    },
  });

  //
  const onSubmit = (values) => {
    const result = handleUpdateServices(values);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography
        sx={{ fontSize: "36px", fontWeight: "600" }}
        textAlign={"center"}
      >
        Edit Data Services
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
                defaultValue={data.id}
                render={({ field }) => {
                  return (
                    <TextField
                      name="id"
                      label="ID"
                      {...field}
                      disabled
                      error={Boolean(errors.id)}
                      helperText={Boolean(errors.id) && errors.id.message}
                    />
                  );
                }}
              />

              <Controller
                name="maCongViec"
                control={control}
                defaultValue={data.maCongViec}
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
                defaultValue={data.maNguoiThue}
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
                defaultValue={dayjs(data.birthday)}
                render={(field) => {
                  return (
                    <DatePicker
                      label="Date Of Hire"
                      format="DD/MM/YYYY"
                      defaultValue={dayjs(data.birthday)}
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

              <Controller
                name="hoanThanh"
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      select
                      name="hoanThanh"
                      label="Status"
                      {...field}
                      onChange={(status) =>
                        setValue("hoanThanh", status.target.value)
                      }
                      error={Boolean(errors.hoanThanh)}
                      helperText={
                        Boolean(errors.hoanThanh) && errors.hoanThanh.message
                      }
                    >
                      <MenuItem value={true}>Finish</MenuItem>
                      <MenuItem value={false}>Unfinish</MenuItem>
                    </TextField>
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

export default EditServices;
