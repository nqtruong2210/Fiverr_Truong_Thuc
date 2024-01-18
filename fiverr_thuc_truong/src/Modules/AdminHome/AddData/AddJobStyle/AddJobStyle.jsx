import { LoadingButton } from "@mui/lab";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../Routes/path";
import { addJobStyle } from "../../../../API/AdminTechnique";

const AddJobStyle = () => {
  const navigate = useNavigate();
  //tanstack
  const { mutate: handleAddJobStyle } = useMutation({
    mutationKey: ["addJob"],
    mutationFn: (values) => addJobStyle(values),
    onSuccess: () => {
        navigate(`/admin/${PATH.MANAGE_JOBSTYLE}`)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Done",
            showConfirmButton: false,
            timer: 1500
          });
    },
  });

  //form
  const { control, handleSubmit } = useForm({
    defaultValues: {
      tenLoaiCongViec: "",
    },
  });
  const onSubmit = (values) => {
    handleAddJobStyle(values);
  };

  return (
    <Box>
      <Typography>Add Job Style</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="tenLoaiCongViec"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField label="Name Job Style" {...field} />
          )}
        />
        <LoadingButton type="submit">Add</LoadingButton>
      </form>
    </Box>
  );
};

export default AddJobStyle;
