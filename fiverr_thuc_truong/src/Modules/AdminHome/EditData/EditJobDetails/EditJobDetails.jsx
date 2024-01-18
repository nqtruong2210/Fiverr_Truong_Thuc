import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { updateImageJobDetails, updateJobDetails } from "../../../../API/AdminTechnique";
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
  console.log("data", data.dsChiTietLoai);

  const { mutate: handleUpdateJobDetails } = useMutation({
    mutationFn: (values) => updateJobDetails(values),
    onSuccess: () => alert("hay"),
    onError: () => alert("loi~vai"),
  });
  const { mutate: handleUpdateJobDetailsImage } = useMutation({
    mutationFn: (values) => updateImageJobDetails(values),
    onSuccess: () => alert("hay"),
    onError: () => alert("loi~vai"),
  });
  const { control, handleSubmit, setValue, watch, register } = useForm({
    defaultValues: {
      id: data.id,
      tenChiTiet: data.tenNhom,
      maLoaiCongViec: data.maLoaiCongviec,
      danhSachChiTiet: data.dsChiTietLoai.map((item) => item.id),
      formFile: undefined,
      MaNhomLoaiCongViec: undefined,
    },
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
            render={({ field }) => <TextField label="ID" {...field} disabled />}
          />
          <Controller
            name="tenChiTiet"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField label="Group Name" {...field} />}
          />
          <Controller
            name="maLoaiCongViec"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField label="Job Type ID" {...field} />}
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
              <Button
                onClick={() => {
                  setValue("formFile", undefined);
                }}
              >
                Xoa Hinh
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
