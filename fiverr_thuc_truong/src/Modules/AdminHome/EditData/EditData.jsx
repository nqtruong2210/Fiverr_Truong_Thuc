import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import EditJob from "./EditJob";
import EditJobStyle from "./EditJobStyle";
import EditJobDetails from "./EditJobDetails";
import EditUser from "./EditUser";
import EditServices from "./EditServices/EditServices";
import EditComments from "./EditComments";
import { useNavigate } from "react-router-dom";

const EditData = () => {
  const navigate = useNavigate()
  const {
    data,
    isOpenEditJob,
    isOpenEditJobStyle,
    isOpenEditJobDetails,
    isOpenEditUser,
    isOpenEditServices,
    isOpenEditComment,
  } = useSelector((state) => state.EditData);

  useEffect(() => {
    const areAllFalse =
      !isOpenEditJob &&
      !isOpenEditJobStyle &&
      !isOpenEditJobDetails &&
      !isOpenEditUser &&
      !isOpenEditServices &&
      !isOpenEditComment;

    if (areAllFalse) {
      navigate("/admin/manage-user");
    }
  }, [
    isOpenEditJob,
    isOpenEditJobStyle,
    isOpenEditJobDetails,
    isOpenEditUser,
    isOpenEditServices,
    isOpenEditComment,
  ]);
  return (
    <Box>
      {isOpenEditJob ? (
        <EditJob data={data} />
      ) : isOpenEditJobStyle ? (
        <EditJobStyle data={data} />
      ) : isOpenEditJobDetails ? (
        <EditJobDetails data={data} />
      ) : isOpenEditUser ? (
        <EditUser data={data} />
      ) : isOpenEditServices ? (
        <EditServices data={data} />
      ) : isOpenEditComment ? (
        <EditComments data={data} />
      ) : (
        "trong"
      )}
    </Box>
  );
};

export default EditData;
