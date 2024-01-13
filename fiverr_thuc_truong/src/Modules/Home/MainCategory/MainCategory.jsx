import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const icons = [
  'business.png',
  'graphics-design.png',
  'lifestyle.png',
  'music-audio.png',
  'online-marketing.png',
  'programming.png',
  'video-animation.png',
  'writing-translation.png',
];

const MainCategory = () => {
  return (
    <div className="container">
      <Typography
        variant="h4"
        sx={{ display: 'inline-block', borderBottom: 'solid 1px #333' }}
      >
        Explore the marketplace
      </Typography>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={14}
        flexWrap={'wrap'}
        mt={8}
      >
        {icons.map((item, index) => (
          <Link
            key={index}
            to={'jobs/' + index}
            style={{
              textDecoration: 'none',
              color: 'GrayText',
              position: 'relative',
            }}
          >
            <Box textAlign={'center'} className="category-icon">
              <img src={'./Image/main-category/' + item} alt={item} />

              <Typography>Graphics & Design</Typography>
            </Box>
          </Link>
        ))}
      </Box>
    </div>
  );
};

export default MainCategory;
