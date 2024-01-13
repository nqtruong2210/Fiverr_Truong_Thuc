import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import FooterClient from '../../Components/Client/FooterClient';
import HeaderClient from '../../Components/Client/HeaderClient';

const ClientLayout = () => {
  return (
    <Box>
      <HeaderClient />
      <Outlet />
      <FooterClient />
    </Box>
  );
};

export default ClientLayout;
