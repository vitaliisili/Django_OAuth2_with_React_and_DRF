import React, {useState} from 'react';
import reg_bg from '../static/images/reg_bg.jpg'
import {FaLock, FaUser} from "react-icons/fa";
import google from '../static/images/google.svg'
import facebook from '../static/images/facebook.svg'
import linkedin from '../static/images/linkedin.svg'
import github from '../static/images/github.svg'
import {Link, useNavigate} from "react-router-dom";
import axios from "../api/axios";

const REGISTER_URL = '/api/profile/users/'
const FACEBOOK_ID = process.env.REACT_APP_FACEBOOK_KEY
const GOOGLE_ID = process.env.REACT_APP_GOOGLE_OAUTH2_KEY
const REACT_APP_CLIENT_URL = process.env.REACT_APP_CLIENT_URL
const GITHUB_ID = process.env.REACT_APP_GITHUB_ID

const Registration = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')

    const registrationHandler = async () => {

        if (password !== checkPassword) {
            console.log("Password not match")
            return
        }

        try {
            const response = await axios.post(REGISTER_URL, {
                email,
                password
            }, {
                withCredentials: true
            });
            console.log('Registration success')
            navigate('/')

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

    return (
        <div className="flex h-screen justify-center items-center bg-no-repeat bg-cover" style={{backgroundImage: `url(${reg_bg})`}}>

            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-4xl font-poppins text-white mb-4'>Register</h1>
                <div className='flex justify-center items-center bg-white/30 backdrop-blur-sm rounded-3xl backdrop-opacity-85'>
                    <FaUser className='text-white pl-3 pr-2 text-4xl'/>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="text"
                           className='bg-transparent py-3 text-gray-700 border-none focus:ring-0 focus:outline-0'
                           placeholder='Email address'/>
                </div>

                <div className='flex justify-center items-center bg-white/30 backdrop-blur-sm mt-4 rounded-3xl backdrop-opacity-85'>
                    <FaLock className='text-white pl-3 pr-2 text-4xl'/>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password"
                           className='bg-transparent py-3 text-gray-700 border-none focus:ring-0 focus:outline-0'
                           placeholder='Password'/>
                </div>

                <div className='flex justify-center items-center bg-white/30 backdrop-blur-sm mt-4 rounded-3xl backdrop-opacity-85'>
                    <FaLock className='text-white pl-3 pr-2 text-4xl'/>
                    <input onChange={(e) => setCheckPassword(e.target.value)} value={checkPassword} type="password"
                           className='bg-transparent py-3 text-gray-700 border-none focus:ring-0 focus:outline-0'
                           placeholder='Check password'/>
                </div>

                <button onClick={registrationHandler}
                        className='text-white bg-[#fc636b] font-bold rounded-3xl w-full py-2 mt-4'>Register
                </button>

                <div className='text-white mt-4 w-full text-center'>Or login using social media</div>
                <div className='flex mt-3 w-full justify-around'>
                    <img onClick={googleLoginHandler} className='cursor-pointer' src={google} alt="google" width='50' height='50'/>
                    <img onClick={facebookLoginHandler} className='cursor-pointer' src={facebook} alt="facebook" width='50' height='50'/>
                    {/*<img className='cursor-pointer' src={linkedin} alt="linkedin" width='50' height='50'/>*/}
                    <img onClick={githubLoginHandler} className='cursor-pointer' src={github} alt="github" width='50' height='50'/>
                </div>

                <div className='text-white mt-4 font-bold uppercase'>
                    <Link to='/'>Log In</Link>
                </div>
            </div>

        </div>
    );
};

export default Registration;