import { useState, useEffect } from 'react'
import { ListItem, Grid, ListItemText } from "@mui/material";
import { chatApi } from '../../Helper/helper';

function Message(props) {
    const [messages, setMessage] = useState([])

    async function getMessage() {
        const messageRes = await chatApi({ receiverId: props.messagefor }, "getMessage")
        if (messageRes.status === 200) {

            // setMessage(messageRes.data.messages)
            return messageRes.data.messages
        }
    }
    useEffect(() => {
        const intervalId = setInterval(() => {
          getMessage().then(data => {
            setMessage(data);
          });
        }, 3000);
      
        return () => {
          clearInterval(intervalId);
        };
        // eslint-disable-next-line
      }, [props.sentMessage]);

    return (
        <>
            {props.messagefor.length !== 0 ? messages.map((message, index) => (
                <ListItem key={index}>
                    <Grid container>
                        <Grid item xs={12}>
                            {message.senderId === props.messagefor ? <ListItemText align={"left"} primary={message.content} /> : <ListItemText align={"right"} primary={message.content} />}
                        </Grid>
                    </Grid>
                </ListItem>)) : ""}
        </>

    )
}

export default Message;
