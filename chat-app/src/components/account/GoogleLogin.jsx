import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { AccountContext } from '../../contexts/AccountProvider';
import jwt_decode from "jwt-decode";

const Login = () => {
    const { setAccount, showloginButton, setShowloginButton, setShowlogoutButton } = React.useContext(AccountContext);

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: 'linear-gradient(to bottom, #a0c4ff, #f8f9fa)', // Change this gradient
        // backgroundImage: 'url("https://via.placeholder.com/800x600?text=Coffee+Shop+Image")', // Uncomment for image
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };

    const titleStyle = {
        marginBottom: '16px', // You can adjust this value
        color: 'white', // Change text color for better visibility
    };

    const onLoginSuccess = async (res) => {
        let decoded = jwt_decode(res.credential);
        setAccount(decoded);
        setShowloginButton(false);
        setShowlogoutButton(true);
        console.log(res);
        console.log(decoded);
        // await addUser(decoded);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };
    return (
        <div style={containerStyle}>
            <div>
                <h4 style={titleStyle}>Welcome to Our Chat App! Please Log In</h4>
                {/* <GoogleLogin
                    onSuccess={onLoginSuccess}
                    onError={onLoginFailure}
                    render={(renderProps) => (
                        <button
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'blue',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                borderRadius: '4px',
                            }}
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        >
                            Log in with Google
                        </button>
                    )}
                /> */}
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                    }}

                    onError={() => {
                        console.log('Login Failed');
                    }}

                />
            </div>
        </div>
    );
};

export default Login;
