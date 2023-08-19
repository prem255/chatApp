import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { AccountContext } from '../../contexts/AccountProvider';
import jwt_decode from "jwt-decode";

const Login = () => {
    const { setAccount, showloginButton, setShowloginButton, setShowlogoutButton } = React.useContext(AccountContext);

    const onLoginSuccess = async (res) => {
        let decoded = jwt_decode(res.credential);
        setAccount(decoded);
        setShowloginButton(false);
        setShowlogoutButton(true);
        console.log(res)
        console.log(decoded)
        // await addUser(decoded);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    return (
        <GoogleLogin
            onSuccess={onLoginSuccess}
            onError={onLoginFailure}
        />
    )
}

export default Login