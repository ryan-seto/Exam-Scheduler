import React, { useEffect, useState }  from "react";
import "./Login.css";

import { GoogleLogin, GoogleLogout } from 'react-google-login';
import emailIcon from '../assets/Login/email.png';
import loginIcon from '../assets/Login/login.png';
import googleIcon from '../assets/Login/google.png';

import { gapi } from 'gapi-script';

const clientId = "1044583009091-346on42a7s1rqdplbi3liqssifi7buj3.apps.googleusercontent.com";

const Login = ({ onLoginSuccess, onLoginFailure, handleCloseModal }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: 'profile email https://www.googleapis.com/auth/calendar',
            })
        };

        gapi.load('client:auth2', start);
    })

    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
        const profile = res.profileObj;
        setUser({
            name: profile.name,
            imageUrl: profile.imageUrl,
        });
        onLoginSuccess(res); // Call the onLoginSuccess function passed from NavBar
        handleCloseModal(); // Close the modal
    };

    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res);
        onLoginFailure(res); // Call the onLoginFailure function passed from NavBar
    }

    return (
        <form className="form_container">
            {/* <div className="logo_container"></div> */}
            <div className="login-title-container">
                <p className="login-title">Login to your Account</p>
                <span className="subtitle">
                    Get started with our app, by creating an account or logging in with Google.
                </span>
            </div>
            <div className="input-container">
                <label className="input_label" htmlFor="email_field">Email</label>
                <div className="input-bar">
                    <img src={emailIcon} alt="Email Icon" className="icon" />
                    <input
                        placeholder="name@mail.com"
                        title="Input title"
                        name="input-name"
                        type="text"
                        className="input_field"
                        id="email_field"
                    />
                </div>
            </div>
            <div className="input-container">
                <label className="input_label" htmlFor="password_field">Password</label>
                <div className="input-bar">
                    <img src={loginIcon} alt="Login Icon" className="icon" />
                    <input
                        placeholder="Password"
                        title="Password title"
                        name="password"
                        type="password"
                        className="input_field"
                        id="password_field"
                    />
                </div>
            </div>
            <span className="password_reset">
                Forgot your password? <a href="#">Reset Password</a>
            </span>
            <button className="submit_button" type="submit">Login</button>
            <div className="signup_prompt">
                <span>Don't have an account? </span>
                <a href="#">Sign up</a>
            </div>
            <div className="external-logins">
                <GoogleLogin
                    clientId={clientId}
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                    render={(renderProps) => (
                        <button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            className="external-button"
                        >
                            Sign in with Google
                            <span className="google-icon">
                                <img src={googleIcon} alt="Google Logo" />
                            </span>
                        </button>
                    )}
                />
                {/* <button className="external-button">
                        Sign in with Google
                        <span className="google-icon">
                            <img src={googleIcon} alt="Google Logo" />
                        </span>
                    </button> */}
                {/* </GoogleLogin> */}
            </div>
        </form>
    );
};

export default Login;
