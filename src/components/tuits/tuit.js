import React from "react";
import TuitStats from "./tuit-stats";

import { Avatar } from "@mui/material";

const Tuit = ({ tuit, likeTuit,dislikeTuit, bookmarkTuit, currentUser,index, deleteBookmark }) => {
    const daysOld = (tuit) => {
        const now = new Date();
        const nowMillis = now.getTime();
        const posted = new Date(tuit.postedOn);
        const postedMillis = posted.getTime();
        const oldMillis = nowMillis - postedMillis;
        let old = 0.0;
        const secondsOld = oldMillis / 1000.0;
        const minutesOld = secondsOld / 60.0;
        const hoursOld = minutesOld / 60.0;
        const daysOld = hoursOld / 24.0;
        if (daysOld > 1) {
            old = Math.round(daysOld) + "d";
        } else if (hoursOld > 1) {
            old = Math.round(hoursOld) + "h";
        } else if (minutesOld > 1) {
            old = Math.round(minutesOld) + "m";
        } else if (secondsOld > 1) {
            old = Math.round(secondsOld) + "s";
        }
        return old;
    };

    return (

        <li className="p-2 ttr-tuit list-group-item d-flex rounded-0">
            <div className="pe-2">
                {tuit.postedBy && (
                    <Avatar sx={{ width: 30, height: 30 }}>
                        {tuit.postedBy.username.slice(0, 1)}
                    </Avatar>
                )}
            </div>
            <div className="w-100">
                <h2 className="fs-5">
                    {tuit.postedBy && tuit.postedBy.username}@
                    {tuit.postedBy && tuit.postedBy.username} -
                    <span className="ms-1">{daysOld(tuit)}</span>
                </h2>
                {tuit.tuit}

                <TuitStats
                    tuit={tuit}
                    currentUser={currentUser}
                    likeTuit={likeTuit}
                    dislikeTuit={dislikeTuit}
                    index={index}
                />
            </div>
        </li>
    );
};
export default Tuit;