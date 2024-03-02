import { Box, Grid, Rating, Stack, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LoadingButton } from "@mui/lab";
import { addCommentAPI } from "../../../../API/AdminTechnique";
import Swal from "sweetalert2";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../Routes/path";

const schemaEdit = yup.object({
  maCongViec: yup
    .string()
    .required("Vui Lòng Nhập Thông Tin")
    .matches(/^\d+$/, "Vui lòng nhập số"),
  maNguoiBinhLuan: yup
    .string()
    .required("Vui Lòng Nhập Thông Tin")
    .matches(/^\d+$/, "Vui lòng nhập số"),
  noiDung: yup.string().required("Vui Lòng Nhập Thông Tin"),
});

const AddComment = () => {
  const navigate = useNavigate();
  //form
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      maCongViec: undefined,
      maNguoiBinhLuan: undefined,
      ngayBinhLuan: "",
      noiDung: "",
      saoBinhLuan: 0,
    },
    mode: "all",
    resolver: yupResolver(schemaEdit),
  });

  //tanstack
  const { mutate: handleAddComment, isPending } = useMutation({
    mutationKey: ["ADD_COMMENT"],
    mutationFn: (values) => addCommentAPI(values),
    onSuccess: () => {
      reset(), navigate("/admin/manage-comment");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Tạo Thành Công",
        showConfirmButton: false,
        timer: 1500,
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
                  <TextField
                    name="maCongViec"
                    label="Code Job"
                    {...field}
                    error={Boolean(errors.maCongViec)}
                    helperText={
                      Boolean(errors.maCongViec) && errors.maCongViec.message
                    }
                  />
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
                    error={Boolean(errors.maNguoiBinhLuan)}
                    helperText={
                      Boolean(errors.maNguoiBinhLuan) &&
                      errors.maNguoiBinhLuan.message
                    }
                  />
                )}
              />
              <Controller
                name="noiDung"
                control={control}
                render={({ field }) => (
                  <TextField
                    name="noiDung"
                    label="Content"
                    {...field}
                    error={Boolean(errors.noiDung)}
                    helperText={
                      Boolean(errors.noiDung) && errors.noiDung.message
                    }
                  />
                )}
              />

              <Controller
                name="ngayBinhLuan"
                control={control}
                render={(field) => {
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
                sx={{ width: "180px" }}
                variant="contained"
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
