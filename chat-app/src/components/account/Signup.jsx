import { useState } from 'react';
import { Avatar, Typography, Button, Box, Container } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { authApi } from '../../Helper/helper'
import TextArea from '../commonComponent/TextArea';

import { validateEmail, validateName, validatePassword } from '../../Helper/commonFunction';

export default function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            if (!email) return toast.error("Email is required")
            if (!password) return toast.error("Password is required")
            if (!name) return toast.error("Name is required")

            if (!validateEmail(email)) return toast.error('Invalid Email')
            if (!validatePassword(password)) return toast.error("Invalid Password")
            if (!validateName(name)) return toast.error("Invalid Name")

            let data = { email, name, password }
            let res = await authApi(data, "signup")
            if (res.status === 200) {
                setName('')
                setEmail("")
                setPassword("")
                return toast.success(res.data.message)
            }
            else {
               return toast.error(res.data.message)
            }
        } catch (error) {
            // console.log("error in login", error)
            return toast.error("Something went wrong")
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <Container component="main" maxWidth="xs" sx={{ height: '500px' }}>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Avatar sx={{ m: 1, bgcolor: 'secondary' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h2" variant="h6">Sign Up</Typography>

                    <Typography component="h2" variant="h6"></Typography>
                    <Box >
                        <TextArea name="email" label="Email" id="email" type="email" value={email} setValue={setEmail} />
                        <TextArea name="name" label="Name" id="name" type="text" value={name} setValue={setName} />
                        <TextArea name="password" label="Password" id="password" type="password" helperText="Password should be of 8-20 character" value={password} setValue={setPassword} />
                        <Button
                            onClick={handleSubmit}
                            fullWidth
                            variant="contained"
                            sx={{ m: 1 }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>

    );
}