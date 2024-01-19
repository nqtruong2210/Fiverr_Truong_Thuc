import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import {
  updateImageJobDetails,
  updateJobDetails,
} from "../../../../API/AdminTechnique";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const schemaEdit = yup.object({
  id: yup
    .string()
    .required("Vui Lòng Nhập Thông Tin")
    .matches(/^\d+$/, "Vui lòng nhập số"),
  tenChiTiet: yup.string().required("Vui Lòng Nhập Thông Tin"),

  maLoaiCongViec: yup
    .string()
    .required("Vui Lòng Nhập Thông Tin")
    .matches(/^\d+$/, "Vui lòng nhập số"),

  danhSachChiTiet: yup.array().required("Vui Lòng Nhập Thông Tin"),
});
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
const EditJobDetails = ({ data }) => {
  const navigate = useNavigate();

  const { mutate: handleUpdateJobDetails } = useMutation({
    mutationFn: (values) => updateJobDetails(values),
    onSuccess: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cập Nhật Thành Công",
        showConfirmButton: false,
        timer: 1500,
      }),
        navigate("/admin/manage-jobdetails");
    },
    onError: () => alert("loi~vai"),
  });
  const { mutate: handleUpdateJobDetailsImage } = useMutation({
    mutationFn: (values) => updateImageJobDetails(values),
  });
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: data.id,
      tenChiTiet: data.tenNhom,
      maLoaiCongViec: data.maLoaiCongviec,
      danhSachChiTiet: data.dsChiTietLoai.map((item) => item.id),
      formFile: undefined,
    },
    mode: "all",
    resolver: yupResolver(schemaEdit),
  });

  const file = watch("formFile");
  console.log("file", file);
  const previewIMG = (file) => {
    return URL.createObjectURL(file);
  };

  const onSubmit = (values) => {
    const updateData = { ...values };
    delete updateData.formFile;
    if (values.formFile.length > 0) {
      const formData = new FormData();
      formData.append("formFile", values.formFile[0]);
      const updateImage = { id: values.id, form: formData };
      handleUpdateJobDetailsImage(updateImage);
    }
    handleUpdateJobDetails(updateData);
  };
  useEffect(() => {
    if (file?.length > 0) {
      console.log("previewImage", previewIMG(file?.[0])); // url
    }
  }, [file]);
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Controller
            name="id"
            control={control}
            defaultValue=""
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
            name="tenChiTiet"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Group Name"
                {...field}
                error={Boolean(errors.tenChiTiet)}
                helperText={
                  Boolean(errors.tenChiTiet) && errors.tenChiTiet.message
                }
              />
            )}
          />
          <Controller
            name="maLoaiCongViec"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Job Type ID"
                {...field}
                error={Boolean(errors.maLoaiCongViec)}
                helperText={
                  Boolean(errors.maLoaiCongViec) &&
                  errors.maLoaiCongViec.message
                }
              />
            )}
          />
          <Controller
            name="danhSachChiTiet"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Type Details"
                {...field}
                onChange={(e) => {
                  const newArray = e.target.value.split(",");
                  setValue("danhSachChiTiet", newArray);
                }}
                error={Boolean(errors.danhSachChiTiet)}
                helperText={
                  Boolean(errors.danhSachChiTiet) &&
                  errors.danhSachChiTiet.message
                }
              />
            )}
          />

          {!file && (
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
          )}
          {file?.length > 0 && (
            <>
              <img src={previewIMG(file[0])} width={270} height={270} />
              <Button sx={{width:90}}
                onClick={() => {
                  setValue("formFile", undefined);
                }}
              >
                Xóa Hình
              </Button>
            </>
          )}
          <LoadingButton type="submit">Update</LoadingButton>
        </Stack>
      </form>
    </Box>
  );
};

export default EditJobDetails;
