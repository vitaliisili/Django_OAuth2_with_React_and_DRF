import React, {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import useAuthService from "../hooks/useAuthService";
import axios from "../api/axios";
import facebook_bg from "../static/images/facebook_bg.jpg";
import github_bg from "../static/images/github_bg.jpg";

const LOGIN_URL = '/auth/convert-token'
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET

const MicrosoftLogin = () => {
    const location =  useLocation()
    const authService = useAuthService()
    const navigate = useNavigate()

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get('code');

        const loginHandler = async  (token) => {
            try {
                const response = await axios.post(LOGIN_URL, {
                    grant_type: 'convert_token',
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    backend: 'microsoft-graph',
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

        const getMicrosoftAccessToken = async () => {
            try {
                const response = await axios.post('/api/profile/users/microsoft/', {
                    code: code
                })
                console.log(response)
                loginHandler(response?.data?.access_token)
            }catch (error) {
                console.log("Failed to get microsoft access token: ", error?.response)
            }
        }

        getMicrosoftAccessToken()
    }, []);

    return (
        <div className="flex h-screen justify-center items-center bg-no-repeat bg-cover" style={{backgroundImage: `url(${github_bg})`}}>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    );
};

export default MicrosoftLogin;