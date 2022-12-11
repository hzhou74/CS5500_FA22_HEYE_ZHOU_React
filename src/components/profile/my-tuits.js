import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import Tuits from "../tuits";
import * as authService from "../../services/auth-service";
import * as tuitService from "../../services/tuits-service";
import {useNavigate} from "react-router-dom";

const MyTuits = () => {
    const navigate = useNavigate();
    const [authprofile, setAuthProfile] = useState({});
    const [profileResp, setProfile] = useState({});
    const [userResp, setUser] = useState({});
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


    return (
        <Box>
            <Typography variant="h3">My Tuits</Typography>

            <div>
                <h4>{authprofile.username}</h4>
                <h6>@{authprofile.username}</h6>
                <button onClick={logout}>
                    Logout
                </button>
                <Box textAlign="center" mt={4}>
                    <Tuits tuits={myTuits}/>
                </Box>
            </div>
        </Box>
    );
}
export default MyTuits
