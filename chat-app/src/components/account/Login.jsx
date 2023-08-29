import { useState } from 'react';
import { Avatar, Typography, Button, Box, Container } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { validateEmail, validatePassword } from '../../Helper/commonFunction';
import { authApi, forgetPassword } from '../../Helper/helper';

import TextArea from '../commonComponent/TextArea';


export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin(e) {
        try {
            e.preventDefault();
            if (email.length === 0) return toast.error("Email required")
            if (password.length === 0) return toast.error("Password Required")

            if (!validateEmail(email)) return toast.error('Invalid Email')
            if (!validatePassword(password)) return toast.error("Invalid Password")

            let data = { email, password }
            let loginResponse = await authApi(data, "login")
            if (loginResponse.status === 200) {
                const token = JSON.stringify(loginResponse?.data?.sessionToken);
                window.localStorage.setItem('token', token.replaceAll("\"", ""))
                toast.success(loginResponse.data.message)
                // navigate('/')
                window.location.href= '/'
            }
            else {
                // console.log("try", loginResponse.data)
                return toast.error(loginResponse.data.message)
            }
        } catch (error) {
            // console.log("error in login", error)
            return toast.error("Something went wrong")
        }
    }
    async function handleForgotPassword() {
        if (!validateEmail(email)) return toast.error("invalid Email")
        await forgetPassword(email)
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
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

                    <Typography component="h2" variant="h6">Log in</Typography>
                    <Box >
                        <TextArea name="email" label="Email" id="email" type="email" setValue={setEmail} value={email} />
                        <TextArea name="password" label="Password" id="password" type="password" setValue={setPassword} helperText="Password should be of 8-20 character" value={password} />
                        <Button
                            onClick={handleLogin}
                            fullWidth
                            variant="contained"
                            sx={{ m: 1 }}
                        >
                            Log In
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ m: 1 }}
                            onClick={handleForgotPassword}
                        >
                            Forget Password
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>

    );
}