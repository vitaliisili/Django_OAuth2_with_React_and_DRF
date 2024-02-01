import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AppContainer from "./components/AppContainer";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Unauthorized from "./components/Unauthorized";
import PrivateRoute from "./components/PrivateRoute";
import Posts from "./pages/Posts";
import FacebookLogin from "./pages/FacebookLogin";
import GoogleLogin from "./pages/GoogleLogin";
import GithubLogin from "./pages/GithubLogin";

const App = () => {
    return (
        <AppContainer>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<Login/>}/>
                    <Route exact path='/registration' element={<Registration/>}/>
                    <Route exact path='/unauthorized' element={<Unauthorized/>}/>
                    <Route exact path='/facebook' element={<FacebookLogin/>}/>
                    <Route exact path='/google' element={<GoogleLogin/>}/>
                    <Route exact path='/github' element={<GithubLogin/>}/>
                    <Route exact path='/posts' element={<PrivateRoute redirectTo='/'><Posts/></PrivateRoute>}/>
                </Routes>
            </BrowserRouter>
        </AppContainer>
    );
};

export default App;
