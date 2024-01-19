import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddJobStyle from "./AddJobStyle";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import AddJobDetails from "./AddJobDetails";
import AddAdmin from "./AddAdmin";
import AddServices from "./AddServices/AddServices";
import AddComment from "./AddComment/AddComment";
import AddJob from "./AddJob";

const AddData = () => {
  const navigate = useNavigate();
  const {
    isOpenAddJobStyle,
    isOpenAddJob,
    isOpenAddAdmin,
    isOpenAddServices,
    isOpenAddJobDetails,
    isOpenAddComment,
  } = useSelector((state) => state.AddData);

  
  useEffect(() => {
    const areAllFalse =
      !isOpenAddJobStyle &&
      !isOpenAddJobDetails &&
      !isOpenAddAdmin &&
      !isOpenAddServices &&
      !isOpenAddComment &&
      !isOpenAddJob;

    if (areAllFalse) {
      navigate("/admin/manage-user");
    }
  }, [
    isOpenAddJobStyle,
    isOpenAddJobDetails,
    isOpenAddAdmin,
    isOpenAddServices,
    isOpenAddComment,
    isOpenAddJob,
  ]);
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
      ) : (
        isOpenAddJob && <AddJob />
      )}
    </Box>
  );
};

export default AddData;
