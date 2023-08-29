import { List, ListItem, ListItemIcon, Avatar, ListItemText } from "@mui/material";

function ChatList(props) {
    const handleListItemClick = (email) => {
        console.log("Clicked user's email:", email);
        props.selectedContact(email)
    }
    console.log(props)
    return (
        <List>
            {props.chatList.length !== 0 ? props.chatList.map((user, index) => (
                <ListItem key={index} onClick={() => handleListItemClick(user.email)}>
                    <ListItemIcon>
                        <Avatar alt={user.name} src={user.profileImage} />
                    </ListItemIcon>
                    <ListItemText primary={user.email} secondary={user?.status || ''} />
                </ListItem>
            )) : ""}
        </List>
    )
}

export default ChatList;