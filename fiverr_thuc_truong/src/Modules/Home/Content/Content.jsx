import { Box, Modal } from '@mui/material';
import React from 'react';
import ReactPlayer from 'react-player';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  width: '80%',
  p: 0,
};
const Content = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="container-content">
      <div className="sub-container">
        <div className="left">
          <h2>A whole world of freelance talent at your fingertips</h2>
          <h6 className="title">
            <span className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 40 40"
              >

                <path
                  fill="#bae0bd"
                  d="M20,38.5C9.8,38.5,1.5,30.2,1.5,20S9.8,1.5,20,1.5S38.5,9.8,38.5,20S30.2,38.5,20,38.5z"
                ></path>
                <path
                  fill="#5e9c76"
                  d="M20,2c9.9,0,18,8.1,18,18s-8.1,18-18,18S2,29.9,2,20S10.1,2,20,2 M20,1C9.5,1,1,9.5,1,20s8.5,19,19,19	s19-8.5,19-19S30.5,1,20,1L20,1z"
                ></path>
                <path
                  fill="none"
                  stroke="#fff"
                  strokeMiterlimit="10"
                  strokeWidth="3"
                  d="M11.2,20.1l5.8,5.8l13.2-13.2"
                ></path>
              </svg>
            </span>
            The best for every budget
          </h6>
          <p className="content">
            Find high-quality services at every price point. No hourly rates,
            just project-based pricing.
          </p>
          <h6 className="title">
            <span className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 40 40"
              >
                <path
                  fill="#bae0bd"
                  d="M20,38.5C9.8,38.5,1.5,30.2,1.5,20S9.8,1.5,20,1.5S38.5,9.8,38.5,20S30.2,38.5,20,38.5z"
                ></path>
                <path
                  fill="#5e9c76"
                  d="M20,2c9.9,0,18,8.1,18,18s-8.1,18-18,18S2,29.9,2,20S10.1,2,20,2 M20,1C9.5,1,1,9.5,1,20s8.5,19,19,19	s19-8.5,19-19S30.5,1,20,1L20,1z"
                ></path>
                <path
                  fill="none"
                  stroke="#fff"
                  strokeMiterlimit="10"
                  strokeWidth="3"
                  d="M11.2,20.1l5.8,5.8l13.2-13.2"
                ></path>
              </svg>
            </span>
            Quality work done quickly
          </h6>
          <p className="content">
            Find the right freelancer to begin working on your project within
            minutes
          </p>
          <h6 className="title">
            <span className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 40 40"
              >
                <path
                  fill="#bae0bd"
                  d="M20,38.5C9.8,38.5,1.5,30.2,1.5,20S9.8,1.5,20,1.5S38.5,9.8,38.5,20S30.2,38.5,20,38.5z"
                ></path>
                <path
                  fill="#5e9c76"
                  d="M20,2c9.9,0,18,8.1,18,18s-8.1,18-18,18S2,29.9,2,20S10.1,2,20,2 M20,1C9.5,1,1,9.5,1,20s8.5,19,19,19	s19-8.5,19-19S30.5,1,20,1L20,1z"
                ></path>
                <path
                  fill="none"
                  stroke="#fff"
                  strokeMiterlimit="10"
                  strokeWidth="3"
                  d="M11.2,20.1l5.8,5.8l13.2-13.2"
                ></path>
              </svg>
            </span>
            Protected payments, every time
          </h6>
          <p className="content">
            Always know what you'll pay upfront. Your payment isn't released
            until you approve the work.
          </p>
          <h6 className="title">
            <span className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 40 40"
              >
                <path
                  fill="#bae0bd"
                  d="M20,38.5C9.8,38.5,1.5,30.2,1.5,20S9.8,1.5,20,1.5S38.5,9.8,38.5,20S30.2,38.5,20,38.5z"
                ></path>
                <path
                  fill="#5e9c76"
                  d="M20,2c9.9,0,18,8.1,18,18s-8.1,18-18,18S2,29.9,2,20S10.1,2,20,2 M20,1C9.5,1,1,9.5,1,20s8.5,19,19,19	s19-8.5,19-19S30.5,1,20,1L20,1z"
                ></path>
                <path
                  fill="none"
                  stroke="#fff"
                  strokeMiterlimit="10"
                  strokeWidth="3"
                  d="M11.2,20.1l5.8,5.8l13.2-13.2"
                ></path>
              </svg>
            </span>
            24/7 support
          </h6>
          <p className="content">
            Questions? Our round-the-clock support team is available to help
            anytime, anywhere.
          </p>
        </div>
        <div className="right" style={{ position: 'relative' }}>
          <button
            onClick={handleOpen}
            type="button"
            className="modal-btn  btn btn-none"
          >
            <img className="modal-img" src="./Image/selling.png" alt="..." />
          </button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="video-selling">
                <ReactPlayer
                  url="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/vmvv3czyk2ifedefkau7"
                  width="100%"
                  height="auto"
                  playing={true}
                  controls={false}
                />
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Content;
