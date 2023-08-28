import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import TextArea from '../commonComponent/TextArea';
import { validateEmail } from '../../Helper/commonFunction'
import { toast } from 'react-toastify'
import { userApi } from '../../Helper/helper';

export default function AddUser(props) {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleAddUser = async () => {
        try {
            if (!validateEmail(email)) return toast.error("Invalid Email")
            let res = await userApi({ newContact: email }, "addNewContact")
            if (res.status === 200) {
                setOpen(false)
                setEmail("")
                props.useStateHook(!props.addUserStatus)
                return toast.success(res.data.message)
            }
            else {
                return toast.error(res.data.message)
            }
        } catch (error) {
            console.log("error in addingUser", error)
            return toast.error("Something went wrong")
        }
    }

    return (
        <>

            <Container>
                <Button variant="contained" size="small" color="primary" onClick={handleClickOpen}>
                    <AddIcon />
                </Button>
                <Dialog open={open} onClose={handleClose} sx={{
                }}>

                    <DialogTitle align={"center"}>Add User</DialogTitle>
                    <DialogContent sx={{ padding: "20px 50px 10px 50px" }}>
                        <DialogContentText sx={{ padding: "10px" }} >
                            Enter Email Address
                        </DialogContentText>
                        <TextArea value={email} setValue={setEmail} id="email" label="Email" />
                    </DialogContent>
                    <DialogActions >
                        <Button variant='contained' onClick={handleClose}>Cancel</Button>
                        <Button variant='contained' onClick={handleAddUser}>Add</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
}
