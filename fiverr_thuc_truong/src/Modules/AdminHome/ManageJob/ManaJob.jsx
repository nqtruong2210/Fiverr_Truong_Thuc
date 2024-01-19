import React, { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { PATH } from "../../../Routes/path";
import Search from "../Search/Search";
import ModalField from "../ModalField/ModalField";
import { AddDataActions } from "../../../store/AddDataSlice/slice";
import { EditDataActions } from "../../../store/EditdataSlice/slice";
import { deleteJob, getListJobPagination } from "../../../API/AdminTechnique";
import { ShowDataActions } from "../../../store/ShowDataSlice/slice";
import "../../../Sass/admin/btnStyle.scss";

const ManaJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //
  const columns = ["id", "Name", "Image", "Description", "Rate", "Price", ""];
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [keyword, setKeyword] = useState("");

  //
  const [openModal, setOpenModal] = useState(false);
  const [isAddJob, setIsAddJob] = useState(false);

  const [isShowInfoJob, setIsShowInfoJob] = useState(false);
  const [job, setJob] = useState();

  const queryClient = useQueryClient();
  //tanstack-query
  const { data: getListJob = {} } = useQuery({
    queryKey: ["LIST_JOB_PAGINATION", keyword, pageIndex, pageSize],
    queryFn: () => getListJobPagination(keyword, pageIndex, pageSize),
  });

  const { mutate: handleDeleteJob } = useMutation({
    mutationFn: (id) => deleteJob(id),
    onSuccess: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Xóa Thành Công",
        showConfirmButton: false,
        timer: 1500,
      }),
        queryClient.invalidateQueries("LIST_JOB_PAGINATION");
    },
    onError: () => alert("loi~vai"),
  });
  const jobPagination = getListJob?.data;
  const count = Math.ceil(getListJob?.totalRow / pageSize);
  const handleChangePage = (event, newPage) => {
    setPageIndex(newPage);
  };

  const handleAddJob = () => {
    dispatch(AddDataActions.setOpenAddJob());
    navigate(`/admin/${PATH.ADD_DATA}`);
  };
  const handleOpenEdit = (job) => {
    return (
      navigate("/admin/edit-data"), dispatch(EditDataActions.setEditJob(job))
    );
  };
  const handleOpenShowInfoJob = (data) => {
    dispatch(ShowDataActions.setShowJob(data));
  };

  return (
    <Box>
      <ModalField />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <button className="style-Btn" role="button" onClick={handleAddJob}>
          <Box className="style-Btn-top text">Add Job</Box>
          <Box className="style-Btn-bottom" />
          <Box className="style-Btn-base" />
        </button>
        <Search setKeyword={setKeyword} />
      </Box>
      <Box>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow:
              "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
            marginY: 3,
          }}
        >
          <Table>
            <TableHead sx={{ background: "#ff6347" }}>
              <TableRow>
                {columns.map((column, index) => {
                  return (
                    <TableCell
                      key={index}
                      sx={{
                        textTransform: "uppercase",
                        fontWeight: 600,
                        display:
                          column === "Description"
                            ? { xs: "none", sm: "table-cell" }
                            : column === "Rate"
                            ? {
                                xs: "none",
                                sm: "table-cell",
                              }
                            : column === "Image" && {
                                xs: "none",
                                sm: "table-cell",
                              },
                      }}
                    >
                      {column}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {jobPagination?.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell width={"15%"}>{item.tenCongViec}</TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", sm: "table-cell" } }}
                    >
                      <img
                        src={item.hinhAnh}
                        alt=""
                        style={{ width: 150, height: 150 }}
                      />
                    </TableCell>
                    <TableCell
                      width={"30%"}
                      sx={{ display: { xs: "none", sm: "table-cell" } }}
                    >
                      {item.moTaNgan}
                    </TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", sm: "table-cell" } }}
                    >
                      {item.danhGia}
                    </TableCell>
                    <TableCell>{item.giaTien}$</TableCell>

                    <TableCell>
                      <Button
                        className="btn-Action btn-Action1"
                        sx={{ minWidth: 0, padding: 1 }}
                        onClick={() => handleOpenEdit(item)}
                      >
                        <EditNoteIcon />
                      </Button>
                      <Button
                        className="btn-Action btn-Action2"
                        sx={{ minWidth: 0, padding: 1 }}
                        onClick={() => handleDeleteJob(item.id)}
                      >
                        <DeleteIcon color="error" />
                      </Button>
                      <Button
                        className="btn-Action btn-Action3"
                        sx={{ minWidth: 0, padding: 1 }}
                        onClick={() => handleOpenShowInfoJob(item)}
                      >
                        <AccountCircleIcon color="success" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}
        >
          <Pagination
            count={count}
            page={pageIndex}
            onChange={handleChangePage}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ManaJob;
