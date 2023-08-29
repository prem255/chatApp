import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import TextArea from '../commonComponent/TextArea';
import { validateEmail, validateName } from '../../Helper/commonFunction'
import { userApi } from '../../Helper/helper';

export default function AddUser() {
    const [open, setOpen] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditUserDetail = async () => {
        try {
            let obj = {}
            if (email.length !== 0) {
                if (!validateEmail(email)) return toast.error("Invalid Email");
                else obj.email = email;
            }
            if (name.length !== 0) {
                if (!validateName(name)) return toast.error("Invalid Name");
                else obj.name = name;
            }
            if (setImage) obj.image = image;
            if (Object.entries(obj).length !== 0) {

                let userData = { ...obj }
                let updateRes = userApi(userData, "updateDetail")
                setOpen(false);
                if (updateRes.status === 200) {
                    return toast.success(updateRes.data.message)
                }
                else {
                    return toast.error(updateRes.data.message)
                }
            }
        } catch (error) {
            // console.log("error in login", error)
            return toast.error("Something went wrong")
        }

    }



    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];

        if (selectedImage) {
            if (selectedImage.type === 'image/jpeg') {
                setImage(selectedImage);
            } else {
                toast.error('Invalid image format. Please upload a JPEG image.');
            }
        }
    };

    return (
        <div>
            <Button variant="contained" size="small" color="primary" onClick={handleClickOpen}>
                <EditIcon />
            </Button>
            <Dialog open={open} onClose={handleClose} sx={{

            }}>
                <DialogTitle align={"center"}>Update Your Details </DialogTitle>
                <DialogContent sx={{ padding: "20px 50px 10px 50px" }}>
                    <DialogContentText sx={{ padding: "10px" }} >
                        Enter your details to update
                    </DialogContentText>
                    <TextArea value={email} setValue={setEmail} id="email" label="Email" />
                    <TextArea value={name} setValue={setName} id="name" label="Name" />
                    <input
                        type="file"
                        accept="image/jpeg"
                        onChange={handleImageChange}
                    />
                    {image && (
                        <div>
                            <Typography>Image Preview:</Typography>
                            <img src={URL.createObjectURL(image)} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                        </div>
                    )}
                    {/* add image option */}
                </DialogContent>
                <DialogActions >
                    <Button variant='contained' onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' onClick={handleEditUserDetail}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
