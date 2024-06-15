import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
        <Toolbar>
         <div className='ello-logo'>   
        <Avatar alt="Ello Logo" 
        src="https://books.ello.com/static/media/logoEllo.2b20bb072a0c339867f3cb02fe3515b6.svg"
        variant="square" sx={{ width: 55, height: 55 }}
        />
        </div>
        </Toolbar>
    </Box>
  );
}