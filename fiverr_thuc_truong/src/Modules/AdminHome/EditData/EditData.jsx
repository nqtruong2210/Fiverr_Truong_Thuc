import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import EditJob from "./EditJob";
import EditJobStyle from "./EditJobStyle";
import EditJobDetails from "./EditJobDetails";
import EditUser from "./EditUser";
import EditServices from "./EditServices/EditServices";
import EditComments from "./EditComments";

const EditData = () => {
  const {
    data,
    isOpenEditJob,
    isOpenEditJobStyle,
    isOpenEditJobDetails,
    isOpenEditUser,
    isOpenEditServices,
    isOpenEditComment,
  } = useSelector((state) => state.EditData);
  console.log("data", data);
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
        <EditComments data={data}/>
      ) : (
        "trong"
      )}
    </Box>
  );
};

export default EditData;
