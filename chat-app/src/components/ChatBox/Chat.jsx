import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import { Paper, Grid, Box, Divider, TextField, Typography, List } from '@mui/material';
import ChatList from './ChatList';
import MessageList from './Message';
import SendMessageBox from './sendMessage';
import AddUser from './AddUser';
import EditUserDetail from './EditUserDetail'
import { userApi } from '../../Helper/helper';
import DefaultChatTemplate from './DefaultChatTemplate';
import decode from 'jwt-decode'



const Chat = () => {
    // Sample user list data
    let token = window.localStorage.getItem('token')
    if (token) token = decode(token)
    // eslint-disable-next-line
    const [user, setUser] = useState([])

    const [contactList, setContactList] = useState([])
    const [addUserStatus, setaddUserStatus] = useState(false)

    const [messagesOfContact, setmessagesOfContact] = useState("")
    const [sentMessage, setSentMessage] = useState(false)

    // const defaultchatList = [
    //     { id: 1, name: 'John Wick', avatarSrc: 'https://material-ui.com/static/images/avatar/1.jpg', status: 'online' },
    //     { id: 2, name: 'Alice', avatarSrc: 'https://material-ui.com/static/images/avatar/3.jpg', status: 'offline' },
    //     { id: 3, name: 'prem Baker', avatarSrc: 'https://material-ui.com/static/images/avatar/2.jpg', status: 'offline' },
    //     { id: 4, name: 'nitesh Baker', avatarSrc: 'https://material-ui.com/static/images/avatar/1.jpg', status: 'offline' },
    //     { id: 5, name: 'Cindy Baker', avatarSrc: 'https://material-ui.com/static/images/avatar/3.jpg', status: 'online' },
    //     { id: 1, name: 'John Wick', avatarSrc: 'https://material-ui.com/static/images/avatar/1.jpg', status: 'online' },
    //     { id: 2, name: 'Alice', avatarSrc: 'https://material-ui.com/static/images/avatar/3.jpg', status: 'offline' },
    //     { id: 3, name: 'prem Baker', avatarSrc: 'https://material-ui.com/static/images/avatar/2.jpg', status: 'offline' },
    //     { id: 4, name: 'nitesh Baker', avatarSrc: 'https://material-ui.com/static/images/avatar/1.jpg', status: 'offline' },
    //     { id: 5, name: 'Cindy Baker', avatarSrc: 'https://material-ui.com/static/images/avatar/3.jpg', status: 'online' },
    //     { id: 1, name: 'John Wick', avatarSrc: 'https://material-ui.com/static/images/avatar/1.jpg', status: 'online' },
    //     { id: 2, name: 'Alice', avatarSrc: 'https://material-ui.com/static/images/avatar/3.jpg', status: 'offline' },
    //     { id: 3, name: 'prem Baker', avatarSrc: 'https://material-ui.com/static/images/avatar/2.jpg', status: 'offline' },
    //     { id: 4, name: 'nitesh Baker', avatarSrc: 'https://material-ui.com/static/images/avatar/1.jpg', status: 'offline' },
    //     { id: 5, name: 'Cindy Baker', avatarSrc: 'https://material-ui.com/static/images/avatar/3.jpg', status: 'online' },
    //     { id: 1, name: 'John Wick', avatarSrc: 'https://material-ui.com/static/images/avatar/1.jpg', status: 'online' },
    //     { id: 2, name: 'Alice', avatarSrc: 'https://material-ui.com/static/images/avatar/3.jpg', status: 'offline' },
    //     { id: 3, name: 'prem Baker', avatarSrc: 'https://material-ui.com/static/images/avatar/2.jpg', status: 'offline' },
    //     { id: 4, name: 'nitesh Baker', avatarSrc: 'https://material-ui.com/static/images/avatar/1.jpg', status: 'offline' },
    //     { id: 5, name: 'Cindy Baker', avatarSrc: 'https://material-ui.com/static/images/avatar/3.jpg', status: 'online' }

    // ];


    const fetchContactList = async () => {
        try {

            let userContacts = await userApi("", "getContact")
            if (userContacts.status === 200) {
                if (userContacts.data.userContactDetail.length !== 0) {
                    setContactList(userContacts.data.userContactDetail)
                    // setUser([])
                }
            }
            else return toast.error(userContacts.data.message)
        }
        catch (e) {
            console.log("error in fetching chat", e)
            return toast.error("Something went wrong.")
        }
    }
    useEffect(() => {
        fetchContactList();
    }, [addUserStatus])

    return (
        <>

            <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h5" className="header-message">
                            Chat
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container component={Paper} sx={{ flexGrow: 1, display: 'flex' }}>
                    <Grid item xs={3} sx={{ borderRight: '1px solid #e0e0e0', overflowY: 'auto' }}>
                        <Box display={'flex'}>
                            <Grid item xs={8}>
                                <ChatList chatList={[{ "email": token?.email }]} />
                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', overflowX: 'hidden' }}>
                                <EditUserDetail />
                                <AddUser addUserStatus={addUserStatus} useStateHook={setaddUserStatus} />
                            </Grid>
                        </Box>
                        <Grid item xs={12} style={{ padding: '10px' }}>
                            <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                        </Grid>
                        <Divider />
                        <Box sx={{ height: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                            <ChatList chatList={contactList} selectedContact={setmessagesOfContact} />
                        </Box>
                    </Grid>
                    <Grid item xs={9} sx={{ display: 'flex', flexDirection: 'column', overflowY: 'none' }}>
                        {messagesOfContact.length !== 0 ?
                            <>
                                <ChatList chatList={contactList.filter(o => o.email === messagesOfContact)} />
                                <List sx={{ height: 'calc(70vh)', overflowY: 'auto' }}>
                                    <MessageList messagefor={messagesOfContact} messageFlag={sentMessage} />
                                </List>
                                <SendMessageBox messagefor={messagesOfContact} sentMessage={sentMessage} messageFlag={setSentMessage} />
                                <Divider />
                            </>
                            : <DefaultChatTemplate />}
                    </Grid>
                </Grid>
            </div>
        </>
    );
}



export default Chat;
