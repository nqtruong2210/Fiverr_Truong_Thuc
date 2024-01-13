import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import SwitchDefault from '../../../Components/Client/Switch/SwitchDefault';

const FilterBar = () => {
  return (
    <Box
      my={3}
      display={'flex'}
      justifyContent={'space-between'}
      flexWrap={'wrap'}
    >
      <Box>
        <FormControl size="small" sx={{ m: 1, minWidth: 150 }}>
          <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Age"
          >
            <MenuItem value="">
              <em>All Categories</em>
            </MenuItem>
            <MenuItem value={10}>Web Programming (20,566)</MenuItem>
            <MenuItem value={20}>Data Entry (12,566)</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ m: 1, minWidth: 150 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Service Option
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Age"
          >
            <MenuItem value="">
              <em>All Categories</em>
            </MenuItem>
            <MenuItem value={10}>Web Programming (20,566)</MenuItem>
            <MenuItem value={20}>Data Entry (12,566)</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ m: 1, minWidth: 150 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Seller Details
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Age"
          >
            <MenuItem value="">
              <em>All Categories</em>
            </MenuItem>
            <MenuItem value={10}>Web Programming (20,566)</MenuItem>
            <MenuItem value={20}>Data Entry (12,566)</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ m: 1, minWidth: 150 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Delivery Time
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Age"
          >
            <MenuItem value="">
              <em>All Categories</em>
            </MenuItem>
            <MenuItem value={10}>Web Programming (20,566)</MenuItem>
            <MenuItem value={20}>Data Entry (12,566)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box display={'flex'} flexWrap={'wrap'}>
        <Box alignItems="center" display={'flex'}>
          <SwitchDefault />
          Pro services
        </Box>
        <Box alignItems="center" display={'flex'}>
          <SwitchDefault />
          Local sellers
        </Box>
        <Box alignItems="center" display={'flex'}>
          <SwitchDefault />
          Online sellers
        </Box>
      </Box>
    </Box>
  );
};

export default FilterBar;
