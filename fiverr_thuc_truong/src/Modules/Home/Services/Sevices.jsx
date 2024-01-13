import Slider from 'react-slick';
const Sevices = () => {
  // Component nút chuyển qua tùy chỉnh
  const CustomNextArrow = (props) => (
    <div
      {...props}
      style={{
        ...props.style,
        display: 'block',
      }}
    />
  );

  // Component nút chuyển lại tùy chỉnh
  const CustomPrevArrow = (props) => (
    <div
      {...props}
      style={{
        ...props.style,
        display: 'block',
      }}
    />
  );
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container">
      <div className="list-jobs">
        <h2> Popular professional services </h2>
        <Slider {...settings}>
          <div>
            <h3>
              <img className="img-services" src="./Image/crs1.png" alt="..." />
            </h3>
          </div>
          <div>
            <h3>
              <img className="img-services" src="./Image/crs2.png" alt="..." />
            </h3>
          </div>
          <div>
            <h3>
              <img className="img-services" src="./Image/crs3.png" alt="..." />
            </h3>
          </div>
          <div>
            <h3>
              <img className="img-services" src="./Image/crs4.png" alt="..." />
            </h3>
          </div>
          <div>
            <h3>
              <img className="img-services" src="./Image/crs5.png" alt="..." />
            </h3>
          </div>
          <div>
            <h3>
              <img className="img-services" src="./Image/crs6.png" alt="..." />
            </h3>
          </div>
          <div>
            <h3>
              <img className="img-services" src="./Image/crs7.png" alt="..." />
            </h3>
          </div>
          <div>
            <h3>
              <img className="img-services" src="./Image/crs8.png" alt="..." />
            </h3>
          </div>
          <div>
            <h3>
              <img className="img-services" src="./Image/crs9.png" alt="..." />
            </h3>
          </div>
          <div>
            <h3>
              <img className="img-services" src="./Image/crs10.png" alt="..." />
            </h3>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Sevices;
