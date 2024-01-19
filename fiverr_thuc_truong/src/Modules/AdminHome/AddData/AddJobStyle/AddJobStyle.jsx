import { LoadingButton } from "@mui/lab";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../Routes/path";
import { addJobStyle } from "../../../../API/AdminTechnique";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";

const schemaEdit = yup.object({
  tenLoaiCongViec: yup.string().required("Vui Lòng Nhập Thông Tin"),
});
const AddJobStyle = () => {
  const navigate = useNavigate();

  //form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      tenLoaiCongViec: "",
    },
    mode: "all",
    resolver: yupResolver(schemaEdit),
  });

  //tanstack
  const { mutate: handleAddJobStyle } = useMutation({
    mutationKey: ["addJob"],
    mutationFn: (values) => addJobStyle(values),
    onSuccess: () => {
      reset(),
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Tạo Thành Công",
          showConfirmButton: false,
          timer: 1500,
        });
    },
  });

  const onSubmit = (values) => {
    handleAddJobStyle(values);
  };

  return (
    <Box>
      <Typography>Add Job Style</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Controller
            name="tenLoaiCongViec"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                label="Name Job Style"
                {...field}
                error={Boolean(errors.tenLoaiCongViec)}
                helperText={
                  Boolean(errors.tenLoaiCongViec) &&
                  errors.tenLoaiCongViec.message
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
          >
            Add
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
};

export default AddJobStyle;
