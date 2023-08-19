import React from 'react';
import {Box} from '@mui/material';
import Scrollor from './Scrollor';
import ChatArea from './ChatArea';
const Dashboard = () => {
    return (
        <>
            {/* dashboard start here */}
            
            <Box sx={{
                display:"flex"
            }}>
                <Scrollor />
                <ChatArea/>
                
        </Box>
        </>
    )
}
export default Dashboard