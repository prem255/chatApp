import { List, ListItem, ListItemIcon, Avatar, ListItemText } from "@mui/material";

function ChatList(props) {
    const handleListItemClick = (email) => {
        props.selectedContact(email)
    }
    return (
        <List sx={{ borderBottom: "1px solid black" }}>
            {props.chatList.length !== 0 ? props.chatList.map((user, index) => (
                <ListItem key={index} onClick={() => handleListItemClick(user.email)}>
                    <ListItemIcon>
                        <Avatar alt={user.name} src={user.profileImage} />
                    </ListItemIcon>
                    <ListItemText primary={user.email} secondary={user?.status || ''} />

                </ListItem >
            )) : ""}
        </List>
    )
}

export default ChatList;