import { Box } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import CarouselItem from './CarouselItem';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <div>
        <Box className="carousel-container">
          <Slider {...settings}>
            <Box>
              <CarouselItem />
              <img className="img-carousel" src="./Image/1.png" alt="..." />
            </Box>
            <Box>
              <CarouselItem />
              <img className="img-carousel" src="./Image/2.png" alt="..." />
            </Box>
            <Box>
              <CarouselItem />
              <img className="img-carousel" src="./Image/3.png" alt="..." />
            </Box>
            <Box>
              <CarouselItem />
              <img className="img-carousel" src="./Image/4.png" alt="..." />
            </Box>
            <Box>
              <CarouselItem />
              <img className="img-carousel" src="./Image/5.png" alt="..." />
            </Box>
          </Slider>
        </Box>
      </div>
      <div className="trusted">
        <span className="trusted-text">Trusted by :</span>
        <Box className="trusted-box">
          <img className="img-trusted" src="./Image/fb.png" alt="..." />
          <img className="img-trusted" src="./Image/google.png" alt="..." />
          <img className="img-trusted" src="./Image/netflix.png" alt="..." />
          <img className="img-trusted" src="./Image/paypal.png" alt="..." />
          <img className="img-trusted" src="./Image/pg.png" alt="..." />
        </Box>
      </div>
    </div>
  );
};

export default Carousel;
