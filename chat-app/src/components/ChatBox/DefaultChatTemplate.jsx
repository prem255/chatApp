import React from 'react';
import { Box} from '@mui/material';
import bgImage from '../../static/bg.jpg'; // Replace with your image path

const CenteredImageBackgroundPage = () => {
  return (
    <Box
      height="90vh"
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
   
    </Box>
  );
};

export default CenteredImageBackgroundPage;
