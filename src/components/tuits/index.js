/**
 * @file Tuit index
 */
import React, {useState, useEffect} from "react";
import "./tuits.css";
import Tuit from "./tuit";
import * as authService from "../../services/auth-service";
/**
 * Tuits react component
 * @param  {tuits} tuits array of tuit data that will be rendered
 *
 * */
const Tuits = ({ tuits = [], setMyBookmarkedTuits }) => {

    const [authprofile, setAuthProfile] = useState({});

    const deleteBookmark =(index) =>{
        const temp= [];
        for(let i=0;i<tuits.length;i++){
            if(i!==index){
                temp.push(tuits[i]);
            }
        }
        setMyBookmarkedTuits(temp);
    }


    useEffect(() => {

        const fetchProfile = async () => {
            try {
                const user = await authService.profile();
                setAuthProfile(user);
            } catch (e) {
            }
        };
        fetchProfile();
    }, []);


    return (
        <div>

            <ul className="ttr-tuits list-group">
                {tuits.map && tuits.map((tuit,index) => <Tuit key={tuit._id} tuit={tuit} currentUser={authprofile} index={index} deleteBookmark={deleteBookmark}/>)}
            </ul>
        </div>
    );
};

export default Tuits;
// import Tuit from "./tuit";
// import * as likesService from "../../services/like-service";
// import * as dislikeService from "../../services/dislike-service";
// import { useEffect, useState } from "react";
// import * as service from "../../services/auth-service";
//
// const Tuits = ({ tuits = [], deleteTuit, refreshTuits }) => {
//     const [profile, setProfile] = useState({});
//
//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const user = await service.profile();
//                 setProfile(user);
//             } catch (e) {
//                 // console.error(e);
//             }
//         };
//         fetchProfile();
//     }, []);
//
//     const likeTuit = (tuit) =>
//         likesService
//             .userTogglesTuitLikes("me", tuit._id)
//             .then(refreshTuits)
//             .catch((e) => alert(e + " please login"));
//
//     const dislikeTuit = (tuit) =>
//         dislikeService
//             .userTogglesTuitDislike("me", tuit._id)
//             .then(refreshTuits)
//             .catch((e) => alert(e + " please login"));
//
//     const findUserLikesTuit = (tid) =>
//         likesService.findUserLikesTuit(profile._id, tid).catch((e) => alert(e));
//
//     return (
//         <div>
//             <ul>
//                 {tuits.map((tuit) => (
//                     <Tuit
//                         key={tuit._id}
//                         deleteTuit={deleteTuit}
//                         likeTuit={likeTuit}
//                         dislikeTuit={dislikeTuit}
//                         tuit={tuit}
//                         findUserLikesTuit={findUserLikesTuit}
//                     />
//                 ))}
//             </ul>
//         </div>
//     );
// };
// export default Tuits;
// // import Tuit from "./tuit";
// // import * as likesService from "../../services/like-service";
// // import * as service from "../../services/auth-service";
// // import {useEffect, useState} from "react";
// // import * as dislikeService from "../../services/dislike-service";
// //
// // const Tuits = ({tuits = [], deleteTuit,
// //                    refreshTuits}) => {
// //     const [profile, setProfile] = useState({});
// //
// //     useEffect(() => {
// //         const fetchProfile = async () => {
// //             try {
// //                 const user = await service.profile();
// //                 setProfile(user);
// //             } catch (e) {
// //                 // console.error(e);
// //             }
// //         };
// //         fetchProfile();
// //     }, []);
// //
// //     const likeTuit = (tuit) =>
// //         likesService
// //             .userTogglesTuitLikes("me", tuit._id)
// //             .then(refreshTuits)
// //             .catch(e => alert(e))
// //
// //     const dislikeTuit = (tuit) =>
// //         dislikeService
// //             .userTogglesTuitDislike("me", tuit._id)
// //             .then(refreshTuits)
// //             .catch((e) => alert(e + " please login"));
// //
// //     // const findUserLikesTuit = (tid) =>
// //     //     likesService.findUserLikesTuit(profile._id, tid).catch((e) => alert(e));
// //     return (
// //         <div>
// //             <ul>
// //                 {
// //                     tuits.map(tuit =>
// //                         <Tuit key={tuit._id}
// //                               deleteTuit={deleteTuit}
// //                               likeTuit={likeTuit}
// //                               dislikeTuit={dislikeTuit}
// //                               tuit={tuit}
// //                               // findUserLikesTuit={findUserLikesTuit}
// //                         />)
// //                 }
// //             </ul>
// //         </div>
// //     );
// // }
// //
// // export default Tuits;
// //
