import fetcher from "./fetcher";

// API lấy menu loại công việc
const getJobTypeMenuAPI = async () => {
  try {
    const response = await fetcher.get("/cong-viec/lay-menu-loai-cong-viec");
    return response.data.content;
  } catch (error) {
    console.log(`FE Error:${error}`);
  }
};

// API lấy danh sách công việc theo tên/{tênCôngViệc}
const getListJobByName = async (nameJob) => {
  try {
    const response = await fetcher.get(
      `/cong-viec/lay-danh-sach-cong-viec-theo-ten/${nameJob}`
    );
    return response.data.content;
  } catch (error) {
    console.log(`FE Error:${error}`);
  }
};
// API lấy công việc theo chi tiết loại
const getJobByTypeDetails = async (maChiTietLoai) => {
  try {
    const response = await fetcher.get(
      `/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${maChiTietLoai}`
    );
    return response.data.content;
  } catch (error) {
    console.log(`FE Error:${error}`);
  }
};

// API lấy chi tiết loại công việc
const layChiTietLoaiCongViec = async (maLoaiCongViec) => {
  try {
    const response = await fetcher.get(
      `/cong-viec/lay-chi-tiet-loai-cong-viec/${maLoaiCongViec}`
    );
    return response.data.content;
  } catch (error) {
    console.log(`FE Error:${error}`);
  }
};
// Lấy công việc chi tiết

const layCongViecChiTiet = async (maCongViec) => {
  try {
    const response = await fetcher.get(
      `/cong-viec/lay-cong-viec-chi-tiet/${maCongViec}`
    );
    console.log("API Response:", response.data);
    return response.data.content;
  } catch (error) {
    console.log(`FE Error:${error}`);
  }
};
const layBinhLuan = async (maCongViec) => {
  try {
    const response = await fetcher.get(
      `/binh-luan/lay-binh-luan-theo-cong-viec/${maCongViec}`
    );
    // console.log(response.data.content);
    return response.data.content;
  } catch (error) {
    console.log(`FE Error:${error}`);
  }
};
const thueCongViec = async (data) => {
  try {
    const response = await fetcher.post("/thue-cong-viec", data);
    return response.data.content;
  } catch (error) {
    console.log(`FE Error:${error}`);
  }
};
const binhLuan = async (data) => {
  try {
    const response = await fetcher.post("/binh-luan", data);
    return response.data.content;
  } catch (error) {
    console.log(`FE Error:${error}`);
  }
};
export {
  getJobByTypeDetails,
  getJobTypeMenuAPI,
  getListJobByName,
  layChiTietLoaiCongViec,
  layCongViecChiTiet,
  layBinhLuan,
  thueCongViec,
  binhLuan,
};
