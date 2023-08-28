import React, { useState } from 'react';
import { Grid, TextareaAutosize, Fab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { chatApi } from '../../Helper/helper';
import { toast } from 'react-toastify';

const SendMessageBox = (props) => {
    const [message, setMessage] = useState('');

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };
    const handleSendMessage = async () => {
        try {

            if (message.length === 0) return;
            else {
                let res = await chatApi({ receiverId: props.messagefor, content: message },"sendMessage")
                if (res.status === 200) {
                    props.messageFlag(!props.sentMessage)
                    setMessage("")
                }
                else throw new Error(res.data.message)
            }
        } catch (e) {
            toast.error("Something went wrong,Try Again")
        }
    }
    return (
        <Grid container style={{ padding: '20px' }}>
            <Grid item xs={11}>
                <TextareaAutosize
                    id="outlined-basic-email"
                    placeholder="Type Something"
                    minRows={3}
                    maxRows={10}
                    value={message}
                    onChange={handleMessageChange}
                    style={{ width: '100%', overflowY: 'scroll' }}
                />
            </Grid>
            <Grid xs={1} align="right">
                <Fab color="primary" aria-label="add" onClick={handleSendMessage}>
                    <SendIcon />
                </Fab>
            </Grid>
        </Grid>
    );
}

export default SendMessageBox;
