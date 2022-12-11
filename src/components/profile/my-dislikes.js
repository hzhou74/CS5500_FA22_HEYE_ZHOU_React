import React, { useEffect, useState } from "react";
import Tuits from "../tuits";
import * as authService from "../../services/auth-service";
import * as UserService from "../../services/users-service";
import * as likeService from "../../services/likes-service";
import * as dislikeService from "../../services/dislikes-service";
import { useNavigate } from "react-router-dom";
function MyDislikes() {
    const navigate = useNavigate();
    const [myDislikedTuits, setMyDislikedTuits] = useState([]);
    const [, setAuthProfile] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const user = await authService.profile();
                console.log("current user: " + JSON.stringify(user));
                let tuits = [];

                const dislikedTuits = await likeService.findTuitsLikedByAUser(user._id);
                // const likedTuits = await dislikeService.findAllTuitsDislikedByUser(user._id);
                for (let i = 0; i < dislikedTuits.length; i++) {
                    const userWhoPostedTheTuit = await UserService.findUserById(
                        dislikedTuits[i].likedTuit.postedBy
                    );
                    tuits.push({
                        ...dislikedTuits[i].likedTuit,
                        postedBy: { username: userWhoPostedTheTuit.username },
                    });
                }
                setMyDislikedTuits(tuits);
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
            <h1>My Disliked Tuits</h1>
            <div className="ttr-home">
                <Tuits tuits={myDislikedTuits} setMyDislikedTuits={setMyDislikedTuits} />
            </div>
        </div>
    );
}
export default MyDislikes;
