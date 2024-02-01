import React, {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import useAuthService from "../hooks/useAuthService";
import axios from "../api/axios";
import google_bg from "../static/images/google_bg.jpeg";

const LOGIN_URL = '/auth/convert-token'
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET

const GoogleLogin = () => {
    const location =  useLocation()
    const authService = useAuthService()
    const navigate = useNavigate()

    useEffect(() => {
        const urlParams = new URLSearchParams(location.hash);
        const token = urlParams.get('access_token');
        const loginHandler = async  () => {
            try {
                const response = await axios.post(LOGIN_URL, {
                    grant_type: 'convert_token',
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    backend: 'google-oauth2',
                    token: token
                }, {
                    withCredentials: true
                });

                const accessToken = response?.data?.access_token
                const refreshToken = response?.data?.refresh_token

                authService.setAccessToken(accessToken)
                authService.setRefreshToken(refreshToken)

                navigate('/posts')

            } catch (error) {
                console.error('Login failed:', error);
            }
        }
        loginHandler()
    }, []);

    return (
        <div className="flex h-screen justify-center items-center bg-no-repeat bg-cover" style={{backgroundImage: `url(${google_bg})`}}>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    );
};

export default GoogleLogin;