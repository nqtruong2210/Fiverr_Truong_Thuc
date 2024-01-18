import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { addImageJobDetails, addJobDetails } from "../../../../API/AdminTechnique";

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
const AddJobDetails = () => {
  //tanstack
  const { mutate: handleAddJobDetails, data: mutationData } = useMutation({
    mutationKey: ["addJobDetails"],
    mutationFn: async (values) => {
      try {
        const dataJobDetails = { ...values };
        delete dataJobDetails.formFile;

        // Assuming addJobDetails returns a Promise, use await to wait for its completion
        const result = await addJobDetails(dataJobDetails);

        return result;
      } catch (error) {
        console.error("Mutation error:", error);
        throw error;
      }
    },
    onSuccess: (mutationData, values) => {
      if (values.formFile.length > 0) {
        const formData = new FormData();
        formData.append("formFile", values.formFile[0]);
        const dataImage = { id: mutationData.id, form: formData };
        handleAddImageJobDetails(dataImage);
      } else {
        alert("Job details didnot have image!");
      }
    },
  });

  const { mutate: handleAddImageJobDetails } = useMutation({
    mutationKey: ["uploadImage"],
    mutationFn: (payload) => addImageJobDetails(payload),
  });
  // useForm
  const { control, handleSubmit, setValue, watch, register } = useForm({
    defaultValues: {
      tenChiTiet: "",
      maLoaiCongViec: "",
      danhSachChiTiet: [],
      formFile: undefined,
    },
  });
  const file = watch("formFile");
  const previewIMG = (file) => {
    return URL.createObjectURL(file);
  };
  const onSubmit = (values) => {
    console.log("values", values);
    handleAddJobDetails(values);
  };

  return (
    <Box>
      <Typography>Add Job Style</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Controller
            name="tenChiTiet"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField label="Name Job Style" {...field} />
            )}
          />
          <Controller
            name="danhSachChiTiet"
            defaultValue={[]}
            control={control}
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
          <Controller
            name="maLoaiCongViec"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField label="ID Job Style Details" {...field} />
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
        </Stack>

        <LoadingButton type="submit">Add</LoadingButton>
      </form>
    </Box>
  );
};

export default AddJobDetails;
