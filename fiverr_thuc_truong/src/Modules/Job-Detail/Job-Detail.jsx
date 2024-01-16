// import { HeaderClient } from '../../Components/Client/HeaderClient/HeaderClient'
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinning from "../../Components/Client/Spinning/Spinning";
import { layCongViecChiTiet, binhLuan } from "../../API/jobAPI";
import Comment from "../Job-Detail/Comment/Comment";
import { useHeaderStore } from "../../store/useHeaderStore";
import { useForm } from "react-hook-form";
import { CURRENT_USER } from "../../Constants";
import { useNavigate } from "react-router-dom";
import fetcher from "../../API/fetcher";
// import '../../Sass/Layouts/_jobDetail'
const JobDetail = () => {
  const { sticky, setSticky } = useHeaderStore();
  const nav = useNavigate();
  if (!sticky) {
    setSticky();
  }
  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["job-detail", id],
    queryFn: () => layCongViecChiTiet(id),
  });

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;
  const dataUser = JSON.parse(localStorage.getItem(CURRENT_USER));
  const dangKy = async () => {
    if (!dataUser) return nav("/sign-in");
    const dataThue = {
      maCongViec: id,
      maNguoiThue: dataUser.user.id,
      ngayThue: formattedToday,
    };
    await fetcher.post("/thue-cong-viec", dataThue).then((res) => {
      console.log(res);
    });
  };
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (!dataUser) return nav("/sign-in");
    const allData = {
      maCongViec: id,
      maNguoiBinhLuan: dataUser.user.id,
      ngayBinhLuan: formattedToday,
      noiDung: data["cmtContent"],
      saoBinhLuan: 0,
    };

    await fetcher.post("/binh-luan", allData).then((res) => {
      console.log("pass");
    });
  };
  if (isLoading) {
    return <Spinning />;
  }
  return (
    <div className="main-layout">
      {data.map((data, index) => (
        <div key={index} className="main-layout__body">
          <div className="breadcrumb">
            <div className="breadcrumb__item">
              <a href="#">{data.tenLoaiCongViec}</a>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12.6 12L8.7 8.1q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.062.375t-.213.325l-4.6 4.6q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7z"
              />
            </svg>
            <div className="breadcrumb__item">
              <a href="#">{data.tenNhomChiTietLoai}</a>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12.6 12L8.7 8.1q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.062.375t-.213.325l-4.6 4.6q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7z"
              />
            </svg>
            <div className="breadcrumb__item">
              <a href="#">{data.tenChiTietLoai}</a>
            </div>
          </div>
          {/* <!-- detail --> */}

          <h1>{data.congViec.tenCongViec}</h1>
          <div className="title-course--info">
            {/* <!-- display flex have, vaatar, name, | , star, total star --> */}
            <div className="title-course--info__avatar">
              <img src={data.avatar} alt="" />
            </div>
            <div className="title-course--info__name">
              <p>{data.tenNguoiTao}</p>
            </div>
            <div className="title-course--info__star">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7.625 6.4L12 .725L16.375 6.4l6.85 2.3l-4.325 6.125l.175 6.825L12 19.675L4.925 21.65L5.1 14.8L.8 8.7z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7.625 6.4L12 .725L16.375 6.4l6.85 2.3l-4.325 6.125l.175 6.825L12 19.675L4.925 21.65L5.1 14.8L.8 8.7z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7.625 6.4L12 .725L16.375 6.4l6.85 2.3l-4.325 6.125l.175 6.825L12 19.675L4.925 21.65L5.1 14.8L.8 8.7z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7.625 6.4L12 .725L16.375 6.4l6.85 2.3l-4.325 6.125l.175 6.825L12 19.675L4.925 21.65L5.1 14.8L.8 8.7z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7.625 6.4L12 .725L16.375 6.4l6.85 2.3l-4.325 6.125l.175 6.825L12 19.675L4.925 21.65L5.1 14.8L.8 8.7z"
                />
              </svg>
              <span>({data.congViec.danhGia})</span>
            </div>
            <div className="title-course--count-order">4 orders in queue</div>
            {/* <!-- tag --> */}
            <div className="title-course--tag">
              process
              <span>category</span>
            </div>
          </div>

          <div className="announce">
            <div className="announce__content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 21h8m-4-4v4M7 4h10m0 0v8a5 5 0 0 1-10 0V4M3 9a2 2 0 1 0 4 0a2 2 0 1 0-4 0m14 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0"
                />
              </svg>
              <span className="hightlight">Amet sasc adipisascascicing</span>
              <span>
                {" "}
                amet consectetur adipisicing elit. Quisquam, voluptatum.
              </span>
            </div>
          </div>
          {/* <!-- slide images --> */}
          <div className="slide-container">
            <div className="slide-main">
              {/* <div className="navigation left">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 6l-6 6l6 6" /></svg>
                            </div>
                            <div className="navigation right">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 6l6 6l-6 6" /></svg>
                            </div> */}
              <div className="img-main">
                <img
                  className="main-img"
                  src={data.congViec.hinhAnh}
                  alt="123"
                />
              </div>
            </div>
          </div>
          <div className="main-layout__card card-mobile">
            <div className="card-header">
              <div className="card-header-option">Basic</div>
              <div className="card-header-option active">Standard</div>
              <div className="card-header-option">Premium</div>
            </div>
            <div className="card-body">
              <div className="card-body__title">
                <p>Standard</p>
                <p>${data.congViec.giaTien}</p>
              </div>
              <p className="card-body__description">
                <strong>{data.congViec.tenCongViec}</strong>
              </p>
              <div className="card-body__information">
                <div className="card-body__information--detail time">
                  {data.congViec.moTaNgan}
                </div>
              </div>
              <button className="card-body__button primary" onClick={dangKy}>
                Continue ${data.congViec.giaTien}
              </button>
              <button className="card-body__button light">
                Compare change
              </button>
            </div>
          </div>
          {/* <!-- description --> */}
          <div className="description">
            <div className="description__title">
              <p>Description</p>
            </div>
            <div className="description__content">
              <p>{data.congViec.moTa}</p>
            </div>
          </div>
          <div className="description-2">
            <div>
              <p>Programming language</p>
              <span>PHP</span>
            </div>
            <div>
              <p>Expertise</p>
              <span>Cross browser</span>
              <span>Compatibility</span>
              <span>PSD to HTML, performance</span>
            </div>
          </div>
          {/* <!-- author --> */}
          <div className="author">
            <div className="author-title">
              <p>About the author</p>
            </div>
            <div className="author-main">
              <div className="author-avatar">
                <img src={data.avatar} alt="/" />
              </div>
              <div className="author-information">
                <p>{data.tenNguoiTao}</p>
                <p>Web developer</p>
                <div className="stars">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M7.625 6.4L12 .725L16.375 6.4l6.85 2.3l-4.325 6.125l.175 6.825L12 19.675L4.925 21.65L5.1 14.8L.8 8.7z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M7.625 6.4L12 .725L16.375 6.4l6.85 2.3l-4.325 6.125l.175 6.825L12 19.675L4.925 21.65L5.1 14.8L.8 8.7z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M7.625 6.4L12 .725L16.375 6.4l6.85 2.3l-4.325 6.125l.175 6.825L12 19.675L4.925 21.65L5.1 14.8L.8 8.7z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M7.625 6.4L12 .725L16.375 6.4l6.85 2.3l-4.325 6.125l.175 6.825L12 19.675L4.925 21.65L5.1 14.8L.8 8.7z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M7.625 6.4L12 .725L16.375 6.4l6.85 2.3l-4.325 6.125l.175 6.825L12 19.675L4.925 21.65L5.1 14.8L.8 8.7z"
                    />
                  </svg>
                </div>
                <button>Contact me</button>
              </div>
            </div>
          </div>
          {/* <!-- FAQ --> */}
          <div className="faq">
            <div className="faq-title">
              <p>FAQ</p>
            </div>
            <div className="faq-item">
              <p>Do you provide regular updates on order</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z"
                />
              </svg>
            </div>
            <div className="faq-item">
              <p>How do you guarantee product quality and relablity</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z"
                />
              </svg>
            </div>
            <div className="faq-item">
              <p>Do you give post- development support</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z"
                />
              </svg>
            </div>
            <div className="faq-item">
              <p>Do you convert PSD to HTML</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z"
                />
              </svg>
            </div>
          </div>
          {/* <!-- reviews --> */}
          <div className="reviews">
            <div className="reviews-header">
              <div className="review-header--left">
                <p>300 Reviews</p>
                <div className="review-header--left--star">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M7.625 6.4L12 .725L16.375 6.4l6.85 2.3l-4.325 6.125l.175 6.825L12 19.675L4.925 21.65L5.1 14.8L.8 8.7z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M7.625 6.4L12 .725L16.375 6.4l6.85 2.3l-4.325 6.125l.175 6.825L12 19.675L4.925 21.65L5.1 14.8L.8 8.7z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M7.625 6.4L12 .725L16.375 6.4l6.85 2.3l-4.325 6.125l.175 6.825L12 19.675L4.925 21.65L5.1 14.8L.8 8.7z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M7.625 6.4L12 .725L16.375 6.4l6.85 2.3l-4.325 6.125l.175 6.825L12 19.675L4.925 21.65L5.1 14.8L.8 8.7z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M7.625 6.4L12 .725L16.375 6.4l6.85 2.3l-4.325 6.125l.175 6.825L12 19.675L4.925 21.65L5.1 14.8L.8 8.7z"
                    />
                  </svg>
                </div>
              </div>
              <div className="review-header--right">
                <span>Sort by</span>
                <p>Most relevant</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m6 9l6 6l6-6"
                  />
                </svg>
              </div>
            </div>
            <div className="reviews-body">
              <div className="review-body--left">
                <div className="review-item colored">
                  <span>5 star</span>
                  <div className="progress"></div>
                  <span>(400)</span>
                </div>
                <div className="review-item colored">
                  <span>4 star</span>
                  <div className="progress"></div>
                  <span>(5)</span>
                </div>
                <div className="review-item">
                  <span>3 star</span>
                  <div className="progress"></div>
                  <span>(0)</span>
                </div>
                <div className="review-item">
                  <span>2 star</span>
                  <div className="progress"></div>
                  <span>(0)</span>
                </div>
                <div className="review-item">
                  <span>1 star</span>
                  <div className="progress"></div>
                  <span>(0)</span>
                </div>
              </div>
              <div className="review-body--right">
                <p>Rating break down</p>
                <div className="review-body--left--item">
                  <p>Seller communication level</p>
                  <div>
                    <span>5</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M7.625 6.4L12 .725L16.375 6.4l6.85 2.3l-4.325 6.125l.175 6.825L12 19.675L4.925 21.65L5.1 14.8L.8 8.7z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="review-body--left--item">
                  <p>Recommend to friend</p>
                  <div>
                    <span>5</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M7.625 6.4L12 .725L16.375 6.4l6.85 2.3l-4.325 6.125l.175 6.825L12 19.675L4.925 21.65L5.1 14.8L.8 8.7z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="review-body--left--item">
                  <p>Service as described</p>
                  <div>
                    <span>5</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M7.625 6.4L12 .725L16.375 6.4l6.85 2.3l-4.325 6.125l.175 6.825L12 19.675L4.925 21.65L5.1 14.8L.8 8.7z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Comment props={id} />
          {/* <!-- comment box --> */}
          <div className="comment-box">
            {/* <!-- avatar --> */}
            <div className="comment-box--avatar">
              {dataUser ? (
                <img src={dataUser.user.avatar} alt={dataUser.user.avatar} />
              ) : (
                <p></p>
              )}
            </div>
            {dataUser ? (
              <div className="box-cmt">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <textarea
                    name="cmtContent"
                    {...register("cmtContent")}
                    id="content"
                  ></textarea>
                  <div className="box-cmt--action">
                    <button type="submit">Add Comment</button>
                  </div>
                </form>
              </div>
            ) : (
              <p onClick={() => nav("/sign-in")}>
                <strong>Đăng Nhập Để Bình Luận !!!</strong>
              </p>
            )}
          </div>
        </div>
      ))}
      {data.map((data, index) => (
        <div
          key={index}
          style={{ position: "sticky", top: "20px", height: "fit-content" }}
        >
          <div className="main-layout__card card-desktop">
            <div className="card-header">
              <div className="card-header-option">Basic</div>
              <div className="card-header-option active">Standard</div>
              <div className="card-header-option">Premium</div>
            </div>
            <div className="card-body">
              <div className="card-body__title">
                <p>Standard</p>
                <p>${data.congViec.giaTien}</p>
              </div>
              <p className="card-body__description">
                <strong>{data.congViec.tenCongViec}</strong>
              </p>
              <div className="card-body__information">
                <div className="card-body__information--detail time">
                  {data.congViec.moTaNgan}
                </div>
              </div>
              <button className="card-body__button primary" onClick={dangKy}>
                Continue ${data.congViec.giaTien}
              </button>
              <button className="card-body__button light">
                Compare change
              </button>
            </div>
          </div>
          <div className="tag-behind-card card-desktop">
            <p>Do you have any special requirement</p>
            <button>Get a guide</button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default JobDetail;
