import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import Tuits from "../tuits";
import tuitsArray from "../tuits/tuits-data.json";
// import Bio from "./bio";

import * as authService from "../../services/auth-service";
import * as tuitService from "../../services/tuits-service";
// import * as serviceProfile from "../../services/profiles-service";
import * as serviceUser from "../../services/users-service";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";

const Placeholder = (
    <Stack spacing={1}>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
    </Stack>
);

/**
 * Profile component with Bio and Tuit component
 */
const Profile = () => {
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

    console.log("authprofile", authprofile);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const uid = authprofile._id.toString();
                console.log("id", uid);
                // const responseProfile = await serviceProfile.findProfileByUserId(uid);

                // setProfile(responseProfile[0]);

                const myTuit = await tuitService.findTuitsByUser(uid);
                setMyTuits(myTuit);
            } catch (e) {
                // navigate("/login");
            }
        };
        fetchProfile();
    }, [authprofile]);

    console.log("profileResp", profileResp);
    console.log("myTuits", myTuits);

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
            {/*<Typography variant="h3">Profile</Typography>*/}
            {/*<Box mt={4} />*/}
            {/*{userResp && profileResp ? (*/}
            {/*    <Bio profile={profileResp} user={userResp} />*/}
            {/*) : (*/}
            {/*    Placeholder*/}
            {/*)}*/}

            <Tuits tuits={myTuits} />
        </Box>
    );
};
export default Profile;
// import React, {useEffect, useState} from "react";
// import Tuits from "../tuits";
// import MyTuits from "./my-tuits";
// import {Link, Route, Routes, useNavigate} from "react-router-dom";
// import * as service from "../../services/auth-service";
// import MyLikes from "./my-likes";
// import MyDislikes from "./my-dislikes";
//
// const Profile = () => {
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState({});
//   useEffect(async () => {
//     try {
//       const user = await service.profile();
//       setProfile(user);
//     } catch (e) {
//       navigate('/login');
//     }
//   }, []);
//   const logout = () => {
//     service.logout()
//         .then(() => navigate('/login'));
//   }
//   return(
//       <div>
//         <h4>{profile.username}</h4>
//         <h6>@{profile.username}</h6>
//         <button onClick={logout}>
//           Logout</button>
//
//           <Link to="/profile/mytuits">
//               Tuits</Link>
//           <Link to="/profile/tuits-and-replies">
//               Tuits & replies</Link>
//           <Link to="/profile/media">
//               Media</Link>
//           <Link to="/profile/mylikes">
//               Likes</Link>
//           <Link to="/profile/mydislikes">
//               Likes</Link>
//
//           <Routes>
//               <Route path="/mytuits"
//                      element={<MyTuits/>}/>
//               {/*<Route path="/tuits-and-replies"*/}
//               {/*       element={<TuitsAndReplies/>}/>*/}
//               {/*<Route path="/media"*/}
//               {/*       element={<Media/>}/>*/}
//               <Route path="/mylikes"
//                      element={<MyLikes/>}/>
//               <Route path="mydislikes" element={<MyDislikes />} />
//           </Routes>
//
//       </div>
//
//   );
// };
// export default Profile;

// const Profile = () => {
//   return(
//     <div className="ttr-profile">
//       <div className="border border-bottom-0">
//         <h4 className="p-2 mb-0 pb-0 fw-bolder">NASA<i className="fa fa-badge-check text-primary"></i></h4>
//         <span className="ps-2">67.6K Tuits</span>
//         <div className="mb-5 position-relative">
//           <img className="w-100" src="../images/nasa-profile-header.jpg"/>
//           <div className="bottom-0 left-0 position-absolute">
//             <div className="position-relative">
//               <img className="position-relative ttr-z-index-1 ttr-top-40px ttr-width-150px"
//                    src="../images/nasa-3.png"/>
//             </div>
//           </div>
//           <Link to="/profile/edit"
//                 className="mt-2 me-2 btn btn-large btn-light border border-secondary fw-bolder rounded-pill fa-pull-right">
//             Edit profile
//           </Link>
//         </div>
//
//         <div className="p-2">
//           <h4 className="fw-bolder pb-0 mb-0">
//             NASA<i className="fa fa-badge-check text-primary"></i>
//           </h4>
//           <h6 className="pt-0">@NASA</h6>
//           <p className="pt-2">
//             There's space for everybody. Sparkles
//           </p>
//           <p>
//             <i className="far fa-location-dot me-2"></i>
//             Pale Blue Dot
//             <i className="far fa-link ms-3 me-2"></i>
//             <a href="nasa.gov" className="text-decoration-none">nasa.gov</a>
//             <i className="far fa-balloon ms-3 me-2"></i>
//             Born October 1, 1958
//             <br/>
//             <i className="far fa-calendar me-2"></i>
//             Joined December 2007
//           </p>
//           <b>178</b> Following
//           <b className="ms-4">51.1M</b> Followers
//           <ul className="mt-4 nav nav-pills nav-fill">
//             <li className="nav-item">
//               <Link to="/profile/tuits"
//                     className="nav-link active">
//                 Tuits</Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/profile/tuits-and-replies"
//                     className="nav-link">
//                 Tuits & replies</Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/profile/media"
//                     className="nav-link">
//                 Media</Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/profile/likes"
//                     className="nav-link">
//                 Likes</Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <Tuits/>
//     </div>
//   );
// }
// export default Profile;