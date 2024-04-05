import React, {useState} from 'react';
import login_bg from '../static/images/login_bg.jpg'
import {FaLock, FaUser} from "react-icons/fa";
import google from '../static/images/google.svg'
import facebook from '../static/images/facebook.svg'
import linkedin from '../static/images/linkedin.svg'
import microsoft from '../static/images/windows.png'
import github from '../static/images/github.svg'
import {Link, useNavigate} from "react-router-dom";
import axios from "../api/axios";
import useAuthService from "../hooks/useAuthService";


const LOGIN_URL = '/auth/token/'
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET
const FACEBOOK_ID = process.env.REACT_APP_FACEBOOK_KEY
const GOOGLE_ID = process.env.REACT_APP_GOOGLE_OAUTH2_KEY
const REACT_APP_CLIENT_URL = process.env.REACT_APP_CLIENT_URL
const GITHUB_ID = process.env.REACT_APP_GITHUB_ID
const MICROSOFT_ID = process.env.REACT_APP_MICROSOFT_ID
const MICROSOFT_TENANT = process.env.REACT_APP_MICROSOFT_TENANT


const Login = () => {

    const authService = useAuthService()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



const [errMsg, setErrMsg] = useState('');
    const loginHandler = async  () => {
        try {
            const response = await axios.post(LOGIN_URL, {
                grant_type: 'password',
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                username: email,
                password,
            }, {
                withCredentials: true
            });

            console.log(response.data)

            const accessToken = response?.data?.access_token
            const refreshToken = response?.data?.refresh_token

            authService.setAccessToken(accessToken)
            authService.setRefreshToken(refreshToken)

            setEmail('')
            setPassword('')
            navigate('/posts')

        } catch (error) {
            console.error('Login failed:', error);
        }
    }
    const facebookLoginHandler = () => {
        window.open(`https://www.facebook.com/v19.0/dialog/oauth?client_id=${FACEBOOK_ID}&redirect_uri=http://localhost:3000/facebook&state={"{st=state123abc,ds=123456789}"}&response_type=token`, "_self")
    }

    const googleLoginHandler = () => {
        window.open(`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&include_granted_scopes=true&response_type=token&state={"{st=state123abc,ds=123456789}"}&redirect_uri=${REACT_APP_CLIENT_URL}/google&client_id=${GOOGLE_ID}`, "_self")
    }

    const githubLoginHandler = () => {
        window.open(`https://github.com/login/oauth/authorize?client_id=${GITHUB_ID}&redirect_uri=${REACT_APP_CLIENT_URL}/github`, '_self')
    }

    const microsoftLoginHandler = () => {
        window.open(`https://login.microsoftonline.com/${MICROSOFT_TENANT}/oauth2/v2.0/authorize?client_id=${MICROSOFT_ID}&response_type=code&redirect_uri=${REACT_APP_CLIENT_URL}/microsoft&response_mode=query&scope=User.Read`, "_self")
    }

    return (
        <div className="flex h-screen justify-center items-center bg-no-repeat bg-cover" style={{backgroundImage: `url(${login_bg})`}}>

            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-4xl font-poppins text-white mb-4'>Login</h1>
                <div className='flex justify-center items-center bg-white/30 backdrop-blur-sm rounded-3xl backdrop-opacity-85'>
                    <FaUser className='text-white pl-3 pr-2 text-4xl'/>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" className='bg-transparent py-3 text-gray-700 border-none focus:ring-0 focus:outline-0' placeholder='Email address'/>
                </div>

                <div className='flex justify-center items-center bg-white/30 backdrop-blur-sm mt-4 rounded-3xl backdrop-opacity-85'>
                    <FaLock className='text-white pl-3 pr-2 text-4xl'/>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='bg-transparent py-3 text-gray-700 border-none focus:ring-0 focus:outline-0' placeholder='Password'/>
                </div>

                <button onClick={loginHandler} className='text-white bg-[#fc636b] font-bold rounded-3xl w-full py-2 mt-4'>Login</button>

                <div className='text-white mt-4 w-full text-center'>Or login using social media</div>
                <div className='flex mt-3 w-full justify-around'>
                    <img onClick={googleLoginHandler} className='cursor-pointer' src={google} alt="google" width='50' height='50'/>
                    <img onClick={facebookLoginHandler} className='cursor-pointer' src={facebook} alt="facebook" width='50' height='50'/>
                    <img onClick={microsoftLoginHandler} className='cursor-pointer' src={microsoft} alt="microsoft" width='50' height='50'/>
                    <img onClick={githubLoginHandler} className='cursor-pointer' src={github} alt="github" width='50' height='50'/>
                </div>

                <div className='text-white mt-4 font-bold uppercase'>
                    <Link to='/registration'>Create Account</Link>
                </div>
            </div>

        </div>
    );
};

export default Login;