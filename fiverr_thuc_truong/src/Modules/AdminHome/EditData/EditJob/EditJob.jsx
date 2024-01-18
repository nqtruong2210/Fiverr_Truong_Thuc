import { Box, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { EditDataActions } from "../../../../store/EditdataSlice/slice";
import { updateJob } from "../../../../API/AdminTechnique";

const schemaEdit = yup.object({
  id: yup
    .string()
    .required("Vui Lòng Nhập Thông Tin")
    .matches(/^\d+$/, "Vui lòng nhập số"),
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
const EditJob = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: data.id,
      tenCongViec: data.tenCongViec,
      danhGia: data.danhGia,
      giaTien: data.giaTien,
      nguoiTao: data.nguoiTao,
      hinhAnh: data.hinhAnh,
      moTa: data.moTa,
      maChiTietLoaiCongViec: data.maChiTietLoaiCongViec,
      moTaNgan: data.moTaNgan,
      saoCongViec: data.saoCongViec,
    },
    mode: "all",
    resolver: yupResolver(schemaEdit),
  });

  //tanstackquery
  const { mutate: handleUpdateJob } = useMutation({
    mutationFn: (values) => updateJob(values),
    onSuccess: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cập Nhật Thành Công",
        showConfirmButton: false,
        timer: 1500,
      }),
        navigate("/admin/manage-job"),
        dispatch(EditDataActions.setEditClose());
    },
  });

  //
  const onSubmit = (values) => {
    handleUpdateJob(values);
  };
  return (
    <Box>
      <Typography variant="h3" fontWeight={600} textAlign={"center"}>
        Edit Job
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <Controller
            name="id"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="ID"
                {...field}
                error={Boolean(errors.id)}
                helperText={Boolean(errors.id) && errors.id.message}
              />
            )}
          />
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
                helperText={Boolean(errors.nguoiTao) && errors.nguoiTao.message}
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
                helperText={Boolean(errors.moTaNgan) && errors.moTaNgan.message}
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
          <LoadingButton type="submit">Update</LoadingButton>
        </Stack>
      </form>
    </Box>
  );
};

export default EditJob;
