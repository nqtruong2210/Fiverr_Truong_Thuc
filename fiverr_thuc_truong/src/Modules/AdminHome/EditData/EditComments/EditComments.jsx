import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Grid, Rating, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { updateCommentAPI } from "../../../../API/AdminTechnique";

const EditComments = ({ data }) => {
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      id: data.id,
      maCongViec: data.maCongViec,
      maNguoiBinhLuan: data.maNguoiBinhLuan,
      ngayBinhLuan: data.ngayBinhLuan,
      noiDung: data.noiDung,
      saoBinhLuan: data.saoBinhLuan,
    },
  });

  //tanstack
  const { mutate: handleUpdateComment, isPending } = useMutation({
    mutationKey: ["comments"],
    mutationFn: (values) => updateCommentAPI(values),
  });
  const onSubmit = (values) => {
    handleUpdateComment(values);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography
        sx={{ fontSize: "36px", fontWeight: "600" }}
        textAlign={"center"}
      >
        Update Comment
      </Typography>
      <Grid
        container
        spacing={3}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item lg={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Controller
                name="id"
                control={control}
                render={({ field }) => (
                  <TextField name="id" label="ID" {...field} disabled />
                )}
              />
              <Controller
                name="maCongViec"
                control={control}
                render={({ field }) => (
                  <TextField name="maCongViec" label="Code Job" {...field} />
                )}
              />
              <Controller
                name="maNguoiBinhLuan"
                control={control}
                render={({ field }) => (
                  <TextField
                    name="maNguoiBinhLuan"
                    label="Commenter Code"
                    {...field}
                  />
                )}
              />
              <Controller
                name="noiDung"
                control={control}
                render={({ field }) => (
                  <TextField name="noiDung" label="Content" {...field} />
                )}
              />

              <Controller
                name="ngayBinhLuan"
                control={control}
                render={({ field }) => {
                  return (
                    <DatePicker
                      label="Date"
                      format="DD/MM/YYYY"
                      name="ngayBinhLuan"
                      views={["day", "month", "year"]}
                      onChange={(date) => {
                        setValue("ngayBinhLuan", date);
                      }}
                      {...field}
                    />
                  );
                }}
              />

              <Controller
                name="saoBinhLuan"
                control={control}
                render={({ field }) => (
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend" fontWeight={600}>
                      Rating:
                    </Typography>
                    <Rating
                      name="saoBinhLuan"
                      value={field.value}
                      onChange={(event, newValue) =>
                        setValue("saoBinhLuan", newValue)
                      }
                    />
                  </Box>
                )}
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

export default EditComments;
