import Tuit from "./tuit";
import * as likesService from "../../services/like-service";
import * as service from "../../services/auth-service";
import {useEffect, useState} from "react";

const Tuits = ({tuits = [], deleteTuit,
                   refreshTuits}) => {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const user = await service.profile();
                setProfile(user);
            } catch (e) {
                // console.error(e);
            }
        };
        fetchProfile();
    }, []);

    const likeTuit = (tuit) =>
        likesService
            .userTogglesTuitLikes("me", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))

    // const findUserLikesTuit = (tid) =>
    //     likesService.findUserLikesTuit(profile._id, tid).catch((e) => alert(e));
    return (
        <div>
            <ul>
                {
                    tuits.map(tuit =>
                        <Tuit key={tuit._id}
                              deleteTuit={deleteTuit}
                              likeTuit={likeTuit}
                              tuit={tuit}
                              // findUserLikesTuit={findUserLikesTuit}
                        />)
                }
            </ul>
        </div>
    );
}

export default Tuits;

