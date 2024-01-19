import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { addJob } from "../../../../API/AdminTechnique";
import Swal from "sweetalert2";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schemaEdit = yup.object({
  tenCongViec: yup.string().required("Vui Lòng Nhập Thông Tin"),
  danhGia: yup
    .string()
    .required("Vui Lòng Nhập Thông Tin")
    .matches(/^\d+$/, "Vui lòng nhập số"),

  giaTien: yup
    .string()
    .required("Vui Lòng Nhập Thông Tin")
    .matches(/^\d+$/, "Vui lòng nhập số"),
  nguoiTao: yup
    .string()
    .required("Vui Lòng Nhập Thông Tin")
    .matches(/^\d+$/, "Vui lòng nhập số"),
  hinhAnh: yup
    .string()
    .url("Vui Lòng Nhập Định Dạng Website")
    .required("Vui Lòng Nhập Thông Tin"),
  moTa: yup.string().required("Vui Lòng Nhập Thông Tin"),
  maChiTietLoaiCongViec: yup
    .string()
    .required("Vui Lòng Nhập Thông Tin")
    .matches(/^\d+$/, "Vui lòng nhập số"),
  moTaNgan: yup.string().required("Vui Lòng Nhập Thông Tin"),
  saoCongViec: yup
    .string()
    .required("Vui Lòng Nhập Thông Tin")
    .matches(/^\d+$/, "Vui lòng nhập số"),
});

const AddJob = () => {
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tenCongViec: "",
      danhGia: 0,
      giaTien: 0,
      nguoiTao: 0,
      hinhAnh: "",
      moTa: "",
      maChiTietLoaiCongViec: 0,
      moTaNgan: "",
      saoCongViec: 0,
    },
    mode: "all",
    resolver: yupResolver(schemaEdit),
  });

  const { mutate: handleAddJob, isPending } = useMutation({
    mutationFn: (values) => addJob(values),
    onSuccess: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Tạo Thành Công",
        showConfirmButton: false,
        timer: 1500,
      }),
        reset(),
        queryClient.invalidateQueries("LIST_JOB_PAGINATION");
    },
  });
  const onSubmit = (values) => {
    handleAddJob(values);
  };
  return (
    <Box>
      <Typography>Add New Job</Typography>
      <Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Controller
              name="tenCongViec"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Job Name"
                  {...field}
                  error={Boolean(errors.tenCongViec)}
                  helperText={
                    Boolean(errors.tenCongViec) && errors.tenCongViec.message
                  }
                />
              )}
            />
            <Controller
              name="danhGia"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Feedback"
                  {...field}
                  error={Boolean(errors.danhGia)}
                  helperText={Boolean(errors.danhGia) && errors.danhGia.message}
                />
              )}
            />
            <Controller
              name="giaTien"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Price"
                  {...field}
                  error={Boolean(errors.giaTien)}
                  helperText={Boolean(errors.giaTien) && errors.giaTien.message}
                />
              )}
            />
            <Controller
              name="nguoiTao"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Created"
                  {...field}
                  error={Boolean(errors.nguoiTao)}
                  helperText={
                    Boolean(errors.nguoiTao) && errors.nguoiTao.message
                  }
                />
              )}
            />
            <Controller
              name="hinhAnh"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Image"
                  {...field}
                  error={Boolean(errors.hinhAnh)}
                  helperText={Boolean(errors.hinhAnh) && errors.hinhAnh.message}
                />
              )}
            />

            <Controller
              name="moTaNgan"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Short Description"
                  {...field}
                  error={Boolean(errors.moTaNgan)}
                  helperText={
                    Boolean(errors.moTaNgan) && errors.moTaNgan.message
                  }
                />
              )}
            />

            <Controller
              name="moTa"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Decription"
                  {...field}
                  error={Boolean(errors.moTa)}
                  helperText={Boolean(errors.moTa) && errors.moTa.message}
                />
              )}
            />
            <Controller
              name="maChiTietLoaiCongViec"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="ID Job Style"
                  {...field}
                  error={Boolean(errors.maChiTietLoaiCongViec)}
                  helperText={
                    Boolean(errors.maChiTietLoaiCongViec) &&
                    errors.maChiTietLoaiCongViec.message
                  }
                />
              )}
            />

            <Controller
              name="saoCongViec"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Rating"
                  {...field}
                  error={Boolean(errors.saoCongViec)}
                  helperText={
                    Boolean(errors.saoCongViec) && errors.saoCongViec.message
                  }
                />
              )}
            />
            <LoadingButton
              sx={{ width: "180px" }}
              variant="contained"
              color="warning"
              size="large"
              type="submit"
              loading={isPending}
            >
              Add
            </LoadingButton>
          </Stack>
        </form>
      </Grid>
    </Box>
  );
};

export default AddJob;
