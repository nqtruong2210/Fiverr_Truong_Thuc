import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";

import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { addJob } from "../../../../API/AdminTechnique";

const AddJob = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
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
  });

  const { mutate: handleAddJob, isPending } = useMutation({
    mutationFn: (values) => addJob(values),
    onSuccess: () => {
      alert("thanh cong");
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
            <TextField
              name="tenCongViec"
              label="Name Job"
              {...register("tenCongViec")}
            />
            <TextField name="giaTien" label="Price" {...register("giaTien")} />
            <TextField name="moTa" label="Decription" {...register("moTa")} />
            <TextField
              name="moTaNgan"
              label="Short Decription"
              {...register("moTaNgan")}
            />
            <TextField
              name="maChiTietLoaiCongViec"
              label="Type ID"
              {...register("maChiTietLoaiCongViec")}
            />
            <TextField
              label="Add image link..."
              name="hinhAnh"
              fullWidth
              {...register("hinhAnh")}
            />
            <LoadingButton type="submit" loading={isPending}>
              Add
            </LoadingButton>
          </Stack>
        </form>
      </Grid>
    </Box>
  );
};

export default AddJob;
