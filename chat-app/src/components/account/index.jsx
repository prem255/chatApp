import { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Signup from './Signup';
import Login from './Login'

const LoginPanel = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Box>
            <Box>
                <Tabs value={selectedTab} onChange={handleTabChange} centered>
                    <Tab label="SignUp" />
                    <Tab label="Login" />
                </Tabs>
            </Box>
            <Box>
                <TabPanel value={selectedTab} index={0}>
                    <Signup />
                </TabPanel>
                <TabPanel value={selectedTab} index={1}>
                    <Login />
                </TabPanel>
            </Box>
        </Box>
    );
};

function TabPanel({ children, value, index }) {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

export default LoginPanel;
