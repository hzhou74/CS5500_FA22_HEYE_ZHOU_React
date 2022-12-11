import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import Tuits from "../tuits";
import * as authService from "../../services/auth-service";
import * as tuitService from "../../services/tuits-service";
import * as serviceUser from "../../services/users-service";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import MyTuits from "./my-tuits";
import MyLikes from "./my-likes";
import MyDislikes from "./my-dislikes";


/**
 * Profile component with Bio and Tuit component
 */
const Profile = () => {
    const navigate = useNavigate();
    const [authprofile, setAuthProfile] = useState({});
    const [, setUser] = useState({});
    const [myTuits, setMyTuits] = useState();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const user = await authService.profile();
                setAuthProfile(user);
            } catch (e) {
                console.log("session profile not found, send to login page");
                navigate("/profile/login");
            }
        };
        fetchProfile();
    }, [navigate]);

    const logout = () => {
        authService.logout()
            .then(() => navigate('/login'));
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const uid = authprofile._id.toString();
                console.log("id", uid);
                const myTuit = await tuitService.findTuitsByUser(uid);
                setMyTuits(myTuit);
            } catch (e) {
                //navigate("/login");
            }
        };
        fetchProfile();
    }, [authprofile]);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const id = authprofile._id.toString();

                let responseUser = await serviceUser.findUserById(id);
                setUser(responseUser);
            } catch (e) {
                // navigate("/login");
            }
        };
        fetchUser();
    }, [authprofile]);

    return (
        <Box>
            <Typography variant="h3">Profile</Typography>

            <div>
                <h4>{authprofile.username}</h4>
                <h6>@{authprofile.username}</h6>
                <button onClick={logout}>
                    Logout</button>

                <Box textAlign="center" mt={4}>
                    <Typography>Click Below to MyTuits</Typography>
                    <Link to="/profile/mytuits">
                        MyTuits</Link>
                    {/*<Link to="/profile/tuits-and-replies">*/}
                    {/*    Tuits & replies</Link>*/}
                    {/*<Link to="/profile/media">*/}
                    {/*    Media</Link>*/}
                    <Typography>Click Below to MyLikes</Typography>
                    <Link to="/profile/mylikes">
                        Likes</Link>
                    <Typography>Click Below to MyDislikes</Typography>
                    <Link to="/profile/mydislikes">
                        DisLikes</Link>

                    <Routes>
                        <Route path="/mytuits"
                               element={<MyTuits/>}/>
                        {/*<Route path="/tuits-and-replies"*/}
                        {/*       element={<TuitsAndReplies/>}/>*/}
                        {/*<Route path="/media"*/}
                        {/*       element={<Media/>}/>*/}
                        <Route path="/mylikes"
                               element={<MyLikes/>}/>
                        <Route path="/mydislikes"
                               element={<MyDislikes/>}/>
                    </Routes>


                </Box>
                <Tuits tuits={myTuits} />
            </div>
        </Box>
    );
};
export default Profile;