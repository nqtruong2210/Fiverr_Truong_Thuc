import { Box, Grid, Rating, Stack, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LoadingButton } from "@mui/lab";
import { addCommentAPI } from "../../../../API/AdminTechnique";


const AddComment = () => {
  //form
  const { handleSubmit, control, setValue, reset } = useForm({
    defaultValues: {
      maCongViec: undefined,
      maNguoiBinhLuan: undefined,
      ngayBinhLuan: undefined,
      noiDung: "",
      saoBinhLuan: 0,
    },
  });

  //tanstack
  const { mutate: handleAddComment, isPending } = useMutation({
    mutationKey: ["ADD_COMMENT"],
    mutationFn: (values) => addCommentAPI(values),
    onSuccess: () => {
      reset({
        maCongViec: undefined,
        maNguoiBinhLuan: undefined,
        ngayBinhLuan: "",
        noiDung: "",
        saoBinhLuan: 0,
      });
    },
  });

  //
  const onSubmit = (values) => {
    handleAddComment(values);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography
        sx={{ fontSize: "36px", fontWeight: "600" }}
        textAlign={"center"}
      >
        Add COMMENT
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
                name="maCongViec"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <TextField name="maCongViec" label="Code Job" {...field} />
                )}
              />
              <Controller
                name="maNguoiBinhLuan"
                defaultValue={""}
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
                defaultValue={0}
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

export default AddComment;
