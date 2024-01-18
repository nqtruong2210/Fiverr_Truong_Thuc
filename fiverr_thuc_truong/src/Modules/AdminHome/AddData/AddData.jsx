import React from "react";
import { Route, Routes } from "react-router-dom";
import AddJobStyle from "./AddJobStyle";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import AddJobDetails from "./AddJobDetails";
import AddAdmin from "./AddAdmin";
import AddServices from "./AddServices/AddServices";
import AddComment from "./AddComment/AddComment";
import AddJob from "./AddJob";

const AddData = () => {
  const {
    isOpenAddJobStyle,
    isOpenAddJob,
    isOpenAddAdmin,
    isOpenAddServices,
    isOpenAddJobDetails,
    isOpenAddComment,
  } = useSelector((state) => state.AddData);

  return (
    <Box>
      {isOpenAddJobStyle ? (
        <AddJobStyle />
      ) : isOpenAddJobDetails ? (
        <AddJobDetails />
      ) : isOpenAddAdmin ? (
        <AddAdmin />
      ) : isOpenAddServices ? (
        <AddServices />
      ) : isOpenAddComment ? (
        <AddComment />
      ) : isOpenAddJob ? <AddJob/> : "trong"}
    </Box>
  );
};

export default AddData;
