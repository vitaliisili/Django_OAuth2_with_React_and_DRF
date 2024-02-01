import React, {useEffect} from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuthService from "../hooks/useAuthService";
import {useNavigate} from "react-router-dom";

const Posts = () => {
    const axios = useAxiosPrivate()
    const authService = useAuthService()
    const navigate = useNavigate()

    useEffect(() => {
        const getPosts = async () => {
            try {
                await axios.get('/api/blog/posts')
                console.log('Access secured data')
            } catch (error) {
                console.log("Failed to get posts: ", error?.response?.data)
            }
        }

        getPosts()
    }, []);


    const logoutHandler = () => {
        authService.logout()
        navigate('/')
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className='text-4xl'>This is secure data</div>
            <button onClick={logoutHandler} className='bg-amber-800 mt-8 px-4 py-1 cursor-pointer rounded-sm'>Logout</button>
        </div>
    );
};

export default Posts;