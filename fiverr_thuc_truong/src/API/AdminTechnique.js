import fetcher from "./fetcher";

//Register Admin
export const registerAPI = async (payload) => {
  try {
    const response = await fetcher.post("/users", payload);
    return response.data.content;
  } catch (error) {
    throw alert("loi~");
  }
};
//USER
export const getUserAPI = async () => {
  try {
    const response = await fetcher.get("/users");
    return response.data.content;
  } catch (error) {
    throw alert("Loi~");
  }
};

export const getListUserPagination = async (keyword, pageIndex, pageSize) => {
  try {
    const response = await fetcher.get("/users/phan-trang-tim-kiem", {
      params: {
        keyword: keyword || "",
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    });
    return response.data.content;
  } catch (error) {}
};

export const deleteUserAPI = async (userId) => {
  try {
    const response = await fetcher.delete("/users", {
      params: {
        id: userId,
      },
    });
  } catch (error) {}
};

export const getUserByIdAPI = async (userId) => {
  try {
    const response = await fetcher.get(`/users/${Number(userId)}`);

    return response.data.content;
  } catch (error) {}
};

export const UpdateUserData = async (payload) => {
  try {
    const response = await fetcher.put(`/users/${Number(payload.id)}`, payload);

    return response.data.content;
  } catch (error) {}
};

export const UpdateProfileData = async (payload) => {
  console.log("payload", payload);
  try {
    const response = await fetcher.put(`/users/${Number(payload.id)}`, payload);
    return response.data.content;
  } catch (error) {
    console.log("error", error);
    alert("loi");
  }
};
export const uploadAvatar = async (payload) => {
  console.log("payload", payload);
  try {
    const response = await fetcher.post("/users/upload-avatar", payload);

    return response.data.content;
  } catch (error) {}
};

//JOB
export const getListJobPagination = async (keyword, pageIndex, pageSize) => {
  try {
    const response = await fetcher.get("/cong-viec/phan-trang-tim-kiem", {
      params: {
        keyword: keyword || "",
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    });

    return response.data.content;
  } catch (error) {}
};

export const addJob = async (payload) => {
  try {
    const response = await fetcher.post("/cong-viec", payload);
  } catch (error) {
    alert("loi~vai");
  }
};
export const deleteJob = async (id) => {
  try {
    const response = await fetcher.delete(`/cong-viec/${Number(id)}`);

    return response.data.content;
  } catch (error) {}
};

export const updateJob = async (payload) => {
  try {
    const response = await fetcher.put(
      `/cong-viec/${Number(payload.id)}`,
      payload
    );
    return response.data.content;
  } catch (error) {}
};

//Job style
export const getListJobStyle = async (keyword, pageIndex, pageSize) => {
  try {
    const response = await fetcher.get("/loai-cong-viec/phan-trang-tim-kiem", {
      params: {
        keyword: keyword || "",
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    });
    return response.data.content;
  } catch (error) {}
};

export const addJobStyle = async (payload) => {
  try {
    const response = await fetcher.post("/loai-cong-viec", payload);
    return response.data.content;
  } catch (error) {}
};

export const deleteJobStyle = async (id) => {
  try {
    const response = await fetcher.delete(`/loai-cong-viec/${id}`);
    return response.data.content;
  } catch (error) {}
};

export const updateJobStyle = async (payload) => {
  try {
    const response = await fetcher.put(
      `/loai-cong-viec/${Number(payload.id)}`,
      payload
    );
  } catch (error) {}
};

// JobStyleDetails
export const getListJobStyleDetails = async (keyword, pageIndex, pageSize) => {
  try {
    const response = await fetcher.get(
      "/chi-tiet-loai-cong-viec/phan-trang-tim-kiem",
      {
        params: {
          keyword: keyword || "",
          pageIndex: pageIndex,
          pageSize: pageSize,
        },
      }
    );
    return response.data.content;
  } catch (error) {}
};

export const addJobDetails = async (payload) => {
  console.log("payload", payload);
  try {
    const response = await fetcher.post(
      "/chi-tiet-loai-cong-viec/them-nhom-chi-tiet-loai",
      payload
    );
    return response.data.content;
  } catch (error) {
    alert("LOI~VAI");
  }
};

export const addImageJobDetails = async (payload) => {
  console.log("payload", payload);
  try {
    const response = await fetcher.post(
      `/chi-tiet-loai-cong-viec/upload-hinh-nhom-loai-cong-viec/${Number(
        payload.id
      )}`,
      payload.form
    );
  } catch (error) {}
};

export const deleteJobDetails = async (id) => {
  try {
    const response = await fetcher.delete(`/chi-tiet-loai-cong-viec/${id}`);
    return response.data.content;
  } catch (error) {}
};

export const updateJobDetails = async (payload) => {
  console.log("payload", payload.id);
  try {
    const response = await fetcher.put(
      `/chi-tiet-loai-cong-viec/sua-nhom-chi-tiet-loai/${Number(payload.id)}`,
      payload
    );
  } catch (error) {
    console.log("error", error);
  }
};

export const updateImageJobDetails = async (payload) => {
  console.log("payload", payload);
  try {
    const response = await fetcher.post(
      `/chi-tiet-loai-cong-viec/upload-hinh-nhom-loai-cong-viec/${Number(
        payload.id
      )}`,
      payload.form
    );
  } catch (error) {}
};
//Services

export const getListService = async (keyword, pageIndex, pageSize) => {
  try {
    const response = await fetcher.get("/thue-cong-viec/phan-trang-tim-kiem", {
      params: {
        keyword: keyword || "",
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    });
    return response.data.content;
  } catch (error) {}
};

export const deleteServices = async (id) => {
  try {
    const response = await fetcher.delete(`/thue-cong-viec/${Number(id)}`);
    return response.data.content;
  } catch (error) {}
};

export const addServices = async (payload) => {
  try {
    const response = await fetcher.post("/thue-cong-viec", payload);
    return response.data.content;
  } catch (error) {
    alert("loi");
    console.log("error", error);
  }
};

export const updateServices = async (payload) => {
  try {
    const response = await fetcher.put(
      `/thue-cong-viec/${Number(payload.id)}`,
      payload
    );
  } catch (error) {
    alert("loi");
    console.log("error", error);
  }
};

// Comment

export const getListCommentAPI = async () => {
  try {
    const response = await fetcher.get("/binh-luan");
    return response.data.content;
  } catch (error) {}
};

export const deleteCommentAPI = async (id) => {
  console.log("id", id);
  try {
    const response = await fetcher.delete(`/binh-luan/${Number(id)}`, id);
    return response.data.content;
  } catch (error) {}
};

export const addCommentAPI = async (payload) => {
  try {
    const response = await fetcher.post("/binh-luan", payload);
    return response.data.content;
  } catch (error) {
    alert("Loi");
    console.log("error", error);
  }
};

export const updateCommentAPI = async (payload) => {
  try {
    const response = await fetcher.put(
      `/binh-luan/${Number(payload.id)}`,
      payload
    );
    return response.data.content;
  } catch (error) {}
};
