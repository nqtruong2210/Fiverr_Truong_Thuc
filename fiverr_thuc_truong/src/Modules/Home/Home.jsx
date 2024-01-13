import { Box, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import Carousel from './Carousel';
import Content from './Content/Content';
import JobTypeMenu from './JobTypeMenu';
import MainCategory from './MainCategory/MainCategory';
import Services from './Services';
import Testimonial from './Testimonial/Testimonial';

const Home = () => {
  const media = useMediaQuery('(min-width: 768px)');
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, []);

  const isSticky = () => {
    const scrollTop = window.scrollY;
    const stick = scrollTop >= 100 ? true : false;
    setSticky(stick);
  };
  return (
    <Box>
      {media && sticky && <JobTypeMenu fixed={true} />}
      <Carousel />
      <Services />
      <Content />
      <Testimonial />
      <MainCategory />
    </Box>
  );
};

export default Home;
