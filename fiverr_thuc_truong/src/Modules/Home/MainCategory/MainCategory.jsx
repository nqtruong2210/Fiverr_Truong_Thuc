import { Box, Typography } from '@mui/material';

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
      <Typography variant="h4">Explore the marketplace</Typography>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={14}
        flexWrap={'wrap'}
        mt={8}
      >
        {icons.map((item, index) => (
          <Box key={index} textAlign={'center'}>
            <img src={'./Image/main-category/' + item} alt={item} />

            <Typography>Graphics & Design</Typography>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default MainCategory;
