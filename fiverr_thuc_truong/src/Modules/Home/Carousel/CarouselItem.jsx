import {
  Avatar,
  Box,
  Button,
  InputBase,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getListJobByName } from '../../../API/jobAPI';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

const CarouselItem = () => {
  const matches = useMediaQuery('(min-width: 650px)');
  const [search, setSearch] = useState('');
  const handleSearch = (e) => setSearch(e.target.value);

  const { isLoading, data: jobs = [] } = useQuery({
    queryKey: ['jobs', search],
    queryFn: () => getListJobByName(search),
  });

  return (
    <Box
      position={'absolute'}
      top={matches ? '20%' : '20%'}
      maxWidth={!matches ? 400 : 620}
      p={3}
    >
      <Typography
        variant={!matches ? 'h4' : 'h3'}
        flexWrap={'wrap'}
        color={'white'}
      >
        Find the perfect freelance services for your business
      </Typography>

      <Box
        sx={{
          height: '40px',
          minWidth: matches ? '500px' : '300px',
          my: !matches ? 2 : 5,
          display: 'flex',
          flexDirection: matches ? 'row' : 'column',
        }}
      >
        <InputBase
          id="outlined-basic"
          sx={{
            bgcolor: 'white',
            height: '100%',
            width: !matches ? '100%' : '80%',
            p: 1.5,
          }}
          placeholder="Search…"
          value={search || ''}
          onChange={handleSearch}
          inputProps={{ 'aria-label': 'search' }}
          flexWrap={'wrap'}
        />

        {matches && (
          <Button
            variant="contained"
            color="success"
            sx={{ height: '100%', borderRadius: '0' }}
            type="submit"
          >
            Search
          </Button>
        )}

        <Box zIndex={1} position={'absolute'} minWidth={400} bgcolor={'white'}>
          {isLoading ? (
            <ListItem alignItems="flex-start">
              <p>Loading ....</p>
            </ListItem>
          ) : (
            jobs.map((job) => (
              <Link
                key={job.id}
                to={`jobs/${job.id}`}
                onClick={handleSearch}
                style={{ textDecoration: 'none' }}
              >
                <ListItem
                  sx={{ ':hover': { background: '#f1f1f1' } }}
                  alignItems="flex-start"
                >
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={job.congViec.hinhAnh} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Brunch this weekend?"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {job.congViec.tenCongViec}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </Link>
            ))
          )}
        </Box>
      </Box>

      {matches && (
        <Box display={'flex'} color={'white'} alignItems={'center'} gap={1}>
          <span>Popular: </span>
          <Button
            p={1}
            variant="outlined"
            sx={{
              color: 'white',
              fontSize: '14px',
              textTransform: 'capitalize',
              border: 'solid 1px white',
              ':hover': {
                backgroundColor: 'white',
                color: 'black',
              },
            }}
            autoCapitalize
          >
            Website Design
          </Button>
          <Button
            p={1}
            variant="outlined"
            sx={{
              color: 'white',
              fontSize: '14px',
              textTransform: 'capitalize',
              border: 'solid 1px white',
              ':hover': {
                backgroundColor: 'white',
                color: 'black',
              },
            }}
            autoCapitalize
          >
            WordPress
          </Button>
          <Button
            p={1}
            variant="outlined"
            sx={{
              color: 'white',
              fontSize: '14px',
              textTransform: 'capitalize',
              border: 'solid 1px white',
              ':hover': {
                backgroundColor: 'white',
                color: 'black',
              },
            }}
            autoCapitalize
          >
            Logo Design
          </Button>
          <Button
            p={1}
            variant="outlined"
            sx={{
              color: 'white',
              fontSize: '14px',
              textTransform: 'capitalize',
              border: 'solid 1px white',
              ':hover': {
                backgroundColor: 'white',
                color: 'black',
              },
            }}
            autoCapitalize
          >
            Video Editing
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CarouselItem;
