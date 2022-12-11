import React, { useEffect, useState } from "react";
import Tuits from "../tuits";
import * as authService from "../../services/auth-service";
import * as UserService from "../../services/users-service";
import * as likeService from "../../services/likes-service";
import { useNavigate } from "react-router-dom";
function MyLikes() {
    const navigate = useNavigate();
    const [myLikedTuits, setMyLikedTuits] = useState([]);
    const [, setAuthProfile] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const user = await authService.profile();
                console.log("current user: " + JSON.stringify(user));
                let tuits = [];

                const likedTuits = await likeService.findTuitsLikedByAUser(user._id);
                for (let i = 0; i < likedTuits.length; i++) {
                    const userWhoPostedTheTuit = await UserService.findUserById(
                        likedTuits[i].likedTuit.postedBy
                    );
                    tuits.push({
                        ...likedTuits[i].likedTuit,
                        postedBy: { username: userWhoPostedTheTuit.username },
                    });
                }
                setMyLikedTuits(tuits);
                setAuthProfile(user);
            } catch (e) {
                // alert("session profile not found, send to login page");
                // navigate("/profile/login");
            }
        };
        fetchProfile();
    }, [navigate]);

    return (
        <div>
            <h1>My Likes</h1>
            <div className="ttr-home">
                <Tuits tuits={myLikedTuits} setMyLikedTuits={setMyLikedTuits} />
            </div>
        </div>
    );
}
export default MyLikes;
// import Tuits from "../tuits";
// import * as service from "../../services/likes-service";
// import {useEffect, useState} from "react";
//
// const MyLikes = () => {
//     const [likedTuits, setLikedTuis] = useState([]);
//     const findTuitsILike = () =>
//         service.findTuitsLikedByAUser("me")
//             .then((tuits) => setLikedTuis(tuits));
//     useEffect(findTuitsILike, []);
//
//     return(
//         <div>
//             <a2>My Likes</a2>
//             <Tuits tuits={likedTuits}
//                    refreshTuits={findTuitsILike}/>
//         </div>
//     );
// };
// export default MyLikes;