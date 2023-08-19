import { useContext } from 'react'
import { Box } from '@mui/material'

import { AccountContext } from '../contexts/AccountProvider'

// Boxs
// import ChatDialog from './chat/ChatDialog'
import Dashboard from '../components/Dashboard'
import LoginDialog from './account/Login'

const Main = () => {
    const { account } = useContext(AccountContext);
    console.log(account);
    return (
        <>
            <Box>
                {account ?
                    // <ChatDialog />
                   <Dashboard/>
                    :
                    <LoginDialog />}
            </Box>
        </>
    )
}

export default Main  