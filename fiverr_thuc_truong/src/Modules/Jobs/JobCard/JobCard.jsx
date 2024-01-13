import { Favorite } from '@mui/icons-material';
import StarIcon from '@mui/icons-material/Star';
import { Avatar, Box, Divider, IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const JobCard = ({ congViec }) => {
  return (
    congViec && (
      <Card sx={{ flexGrow: 1 }} >
        <CardMedia
          sx={{ height: 200 }}
          image={congViec.hinhAnh}
          title="green iguana"
        />
        <CardContent>
          <Box
            display={'flex'}
            justifyContent={'left'}
            alignItems={'center'}
            gap={2}
          >
            <Box>
              <Avatar alt={congViec.nguoiTao} src={congViec.hinhAnh} />
            </Box>
            <Box>
              <Typography variant="subtitle1" component="div">
                {congViec.nguoiTao}
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary">
            {congViec.tenCongViec}
          </Typography>

          <Box display={'flex'}>
            <StarIcon style={{ color: '#ffbe5b' }} />
            <Typography>
              <span style={{ color: '#ffbe5b', fontWeight: 'bold' }}>
                {congViec.saocongViec}
              </span>
              <span> ({congViec.danhGia})</span>
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            aria-label="add to favorites"
            sx={{ ':hover': { color: 'red ' } }}
          >
            <Favorite />
          </IconButton>
          <Box display={'inline-block'}>
            <Typography variant="body1">
              Starting At
              <strong> US${congViec.giaTien}</strong>
            </Typography>
          </Box>
        </CardActions>
      </Card>
    )
  );
};

export default JobCard;
