import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Grid, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { addServices } from "../../../../API/AdminTechnique";

const AddServices = () => {
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      maCongViec: 0,
      maNguoiThue: 0,
      ngayThue: "",
      hoanThanh: "",
    },
  });

  //tanstack
  const { mutate: handleAddServices, isPending } = useMutation({
    mutationKey: "addService",
    mutationFn: (values) => addServices(values),
  });

  //
  const onSubmit = (values) => {
    console.log("values", values);
    const result = handleAddServices(values);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography
        sx={{ fontSize: "36px", fontWeight: "600" }}
        textAlign={"center"}
      >
        Add Services
      </Typography>
      <Grid
        container
        spacing={3}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Controller
                name="maCongViec"
                control={control}
                render={({ field }) => {
                  return <TextField label="Code Job" {...field} />;
                }}
              />

              <Controller
                name="maNguoiThue"
                control={control}
                render={({ field }) => {
                  return <TextField label="Code Renter" {...field} />;
                }}
              />

              <Controller
                name="ngayThue"
                control={control}
                render={(field) => {
                  return (
                    <DatePicker
                      label="Date Of Hire"
                      format="DD/MM/YYYY"
                      views={["day", "month", "year"]}
                      onChange={(date) => {
                        setValue("ngayThue", date);
                      }}
                      {...field}
                    />
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

export default AddServices;
