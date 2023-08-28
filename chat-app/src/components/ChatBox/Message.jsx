import { useState, useEffect } from 'react'
import { ListItem, Grid, ListItemText } from "@mui/material";
import { chatApi } from '../../Helper/helper';

function Message(props) {
    const [messages, setMessage] = useState([])

    async function getMessage() {
        const messageRes = await chatApi({ receiverId: props.messagefor }, "getMessage")
        console.log(messageRes)
        if (messageRes.status === 200) {

            setMessage(messageRes.data.messages)
        }
    }

    useEffect(() => {
        getMessage()
        // eslint-disable-next-line
    }, [props.messagefor, props.messageFlag])

    return (
        <>
            {props.messagefor.length !== 0 ? messages.map((message, index) => (
                <ListItem key={index}>
                    <Grid container>
                        <Grid item xs={12}>
                            {message.senderId === props.messagefor ? <ListItemText align={"right"} primary={message.content} /> : <ListItemText align={"left"} primary={message.content} />}
                        </Grid>
                    </Grid>
                </ListItem>)) : ""}
        </>

    )
}

export default Message;
