import { Box, Modal } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowDataActions } from "../../../Store/ShowDataSlice/slice";
import JobStyleInfo from "./JobStyleInfo";
import JobDetailsInfo from "./JobDetailsInfo";
import UserInfo from "./UserInfo";
import ServicesInfo from "./ServicesInfo";
import CommentInfo from "./CommentInfo";
import JobInfo from "./JobInfo";

const ModalField = () => {
  const {
    data,
    isOpenModal,
    jobData,
    jobStyleData,
    jobDetailData,
    userData,
    serviceData,
    commentData,
  } = useSelector((state) => state.ShowData);

  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(ShowDataActions.setShowDataClose());
  };
  return (
    <Box>
      <Modal
        open={isOpenModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            padding: 3,
            width: "63%",
          }}
        >
          {jobStyleData ? (
            <JobStyleInfo data={data} />
          ) : jobDetailData ? (
            <JobDetailsInfo data={data} />
          ) : userData ? (
            <UserInfo data={data} />
          ) : serviceData ? (
            <ServicesInfo data={data} />
          ) : commentData ? (
            <CommentInfo data={data} />
          ) : jobData ? (
            <JobInfo data={data}/>
          ) : (
            "trong"
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ModalField;
