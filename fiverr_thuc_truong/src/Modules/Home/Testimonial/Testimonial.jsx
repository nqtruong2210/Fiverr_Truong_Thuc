import { Box, Grid, Modal, Typography } from '@mui/material';
import React from 'react';
import ReactPlayer from 'react-player';
import Slider from 'react-slick';

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
const Testimonial = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const CustomNextArrow = (props) => (
    <div {...props} style={{ ...props.style, display: 'block' }} />
  );
  // Component nút chuyển lại tùy chỉnh
  const CustomPrevArrow = (props) => (
    <div {...props} style={{ ...props.style, display: 'block' }} />
  );
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  return (
    <div className="container">
      <Slider {...settings}>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5} position={'relative'}>
              <button
                onClick={handleOpen}
                type="button"
                className="modal-btn  btn btn-none"
              >
                <img
                  width={500}
                  src="https://demo5.cybersoft.edu.vn/img/testimonial1.png"
                  alt=""
                />
              </button>
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography variant="h5">
                Kay Kim, Co-Founder | <strong>rooted</strong>
              </Typography>
              <Typography variant="body1" fontSize={'28px'} sx={{ mt: 3 }}>
                <i>
                  "It's extremely exciting that Fiverr has freelancers from all
                  over the world — it broadens the talent pool. One of the best
                  things about Fiverr is that while we're sleeping, someone's
                  working."
                </i>
              </Typography>
            </Grid>
          </Grid>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="video-selling">
                <ReactPlayer
                  url="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/yja2ld5fnolhsixj3xxw"
                  width="100%"
                  height="auto"
                  playing={true}
                  controls={false}
                />
              </div>
            </Box>
          </Modal>
        </Box>

        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5} position={'relative'}>
              <button
                onClick={handleOpen}
                type="button"
                className="modal-btn  btn btn-none"
              >
                <img
                  width={500}
                  src="https://demo5.cybersoft.edu.vn/img/testimonial1.png"
                  alt=""
                />
              </button>
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography variant="h5">
                Kay Kim, Co-Founder | <strong>rooted</strong>
              </Typography>
              <Typography variant="body1" fontSize={'28px'} sx={{ mt: 3 }}>
                <i>
                  "It's extremely exciting that Fiverr has freelancers from all
                  over the world — it broadens the talent pool. One of the best
                  things about Fiverr is that while we're sleeping, someone's
                  working."
                </i>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Slider>
    </div>
  );
};

export default Testimonial;
