// JobTypeMenu.jsx
import { Box, Button, Grid, MenuItem, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getJobTypeMenuAPI } from '../../../API/jobAPI';

const JobTypeMenu = ({ fixed }) => {
  const { data: dataJobTypeMenu = [] } = useQuery({
    queryKey: ['job-type-menu'],
    queryFn: getJobTypeMenuAPI,
  });

  const [hoveredItem, setHoveredItem] = useState(null);

  const handleButtonHover = (item) => {
    setHoveredItem(item);
  };

  return (
    <div
      className="jobTypeMenu"
      style={{
        position: fixed ? 'fixed' : 'relative',
        marginTop: !fixed && 50,
      }}
    >
      <Grid container spacing={2}>
        {dataJobTypeMenu.map((item) => (
          <Grid
            className="buttonJobTypeMenu"
            item
            key={item.id}
            onMouseEnter={() => handleButtonHover(item.dsNhomChiTietLoai)}
            // onMouseLeave={() => handleButtonHover(null)}
          >
            <Button color="primary">{item.tenLoaiCongViec}</Button>
            {/* {hoveredItem === item.dsNhomChiTietLoai && (
              <Box className="menuItemJobType">
                {item.dsNhomChiTietLoai.map((group) => {
                  console.log(item.dsNhomChiTietLoai);
                  return (
                    <div key={group.id}>
                      <h4>{group.tenNhom}</h4>
                      <ul>
                        {group.dsChiTietLoai.map((detail) => (
                          <Link key={detail.id} to={'/jobs/' + detail.id}>
                            <MenuItem>{detail.tenChiTiet}</MenuItem>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </Box>
            )} */}
            {item.dsNhomChiTietLoai && (
              <Box className="menuItemJobType">
                {item.dsNhomChiTietLoai.map((group) => {
                  return (
                    <Box p={2} key={group.id}>
                      <Typography fontWeight={'bold'}>
                        {group.tenNhom}
                      </Typography>
                      <ul>
                        {group.dsChiTietLoai.map((detail) => (
                          <Link
                            key={detail.id}
                            to={'/jobs/' + detail.id}
                            style={{ textDecoration: 'none', color: '#333' }}
                          >
                            <MenuItem>{detail.tenChiTiet}</MenuItem>
                          </Link>
                        ))}
                      </ul>
                    </Box>
                  );
                })}
              </Box>
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default JobTypeMenu;
