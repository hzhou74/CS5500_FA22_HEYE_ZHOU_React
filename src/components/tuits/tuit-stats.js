import React, {useState,useEffect} from "react";
// import Bookmark from "../bookmarks/bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import * as LikeService from '../../services/likes-service';
const TuitStats = ({ tuit, bookmarkTuit = () => {}, currentUser, index, deleteBookmark, displayComment, commentCount }) => {
    let likeValueDisplayLogic;

    if (tuit.stats && tuit.stats.likes) {
        if (tuit.stats.likes > 0) {
            likeValueDisplayLogic = <FavoriteIcon sx={{ color: "red" }} />;
        }
    } else if (tuit.stats && tuit.stats.likes <= 0) {
        likeValueDisplayLogic = <FavoriteIcon sx={{ color: "gray" }} />;
    }

    const [isTuitLiked, setIsTuitLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);


    // const likeTheTuit = async ()=>{
    //     const result= await LikeService.createLike(currentUser._id,tuit._id);
    //     console.log('after like creation: '+JSON.stringify(result));
    // }
    //
    //
    // const deleteTheTuit = async ()=>{
    //     const result= await LikeService.deleteLike(currentUser._id,tuit._id);
    //     console.log('after delete creation: '+JSON.stringify(result));
    //
    // }

    // const likeTuit = () => {
    //
    //     if(!isTuitLiked){
    //         likeTheTuit();
    //         setIsTuitLiked(true);
    //         setLikeCount((prevCount)=>prevCount+1);
    //     }else {
    //         deleteTheTuit()
    //         setIsTuitLiked(false);
    //         setLikeCount((prevCount)=>prevCount-1);
    //     }
    //
    // }

    // useEffect(() => {
    //
    //     const findLikeCountAndIsTuitLiked = async () =>{
    //
    //         const likedData= await LikeService.findUsersThatLikeTheTuitByTuidId(tuit._id);
    //         setLikeCount(likedData.length);
    //         for(let i=0;i<likedData.length;i++){
    //             if(likedData[i].likedBy._id===currentUser._id){
    //                 setIsTuitLiked(true);
    //                 break;
    //             }
    //         }
    //     }
    //
    //     findLikeCountAndIsTuitLiked();
    // }, [])


    return (
        <div className="row mt-2">

            {/*<div className="col">*/}
            {/*    <i className="far fa-message me-1" onClick={()=>displayComment()}></i>*/}
            {/*    {commentCount}*/}
            {/*</div>*/}
            {/*<div className="col">*/}
            {/*    <i className="far fa-retweet me-1"></i>*/}
            {/*    {tuit.stats && tuit.stats.retuits}*/}
            {/*</div>*/}
            {/*{isTuitLiked&&*/}
            {/*    <div className="col">*/}
            {/*        <i className='fa fa-heart ' style={{color:'red'}} onClick={()=>likeTuit()} ></i>*/}
            {/*        {likeCount}*/}
            {/*    </div>*/}
            {/*}*/}
            {/*{!isTuitLiked&&<div className="col">*/}
            {/*    <i className='fa fa-heart' onClick={()=>likeTuit()}></i>*/}
            {/*    {likeCount}*/}
            {/*</div>*/}
            {/*}*/}
            {/*<div className="col">*/}
            {/*    <i className="far fa-inbox-out"></i>*/}
            {/*</div>*/}
            {/*<div className="col">{Bookmark(tuit,currentUser,index,deleteBookmark)}</div>*/}
        </div>
    );
};
export default TuitStats;
// import {
//     ChatBubbleOutline,
//     Inbox,
//     Repeat,
//     ThumbDownAlt,
//     ThumbUpAlt,
// } from "@mui/icons-material";
// import React, { useEffect, useState } from "react";
//
// const TuitStats = ({ tuit, likeTuit, dislikeTuit, findUserLikesTuit }) => {
//     let likeValueDisplayLogic;
//
//     if (tuit.stats && tuit.stats.likes) {
//         if (tuit.stats.likes > 0) {
//             likeValueDisplayLogic = <ThumbUpAlt sx={{ color: "blue", mx: 1 }} />;
//         }
//     } else {
//         likeValueDisplayLogic = <ThumbUpAlt sx={{ color: "gray", mx: 1 }} />;
//     }
//
//     let dislikeValueDisplayLogic;
//
//     if (tuit.stats && tuit.stats.dislikes) {
//         if (tuit.stats.dislikes > 0) {
//             dislikeValueDisplayLogic = (
//                 <ThumbDownAlt id="red" sx={{ color: "red", mx: 1 }} />
//             );
//         }
//     } else if (tuit.stats && tuit.stats.dislikes <= 0) {
//         dislikeValueDisplayLogic = (
//             <ThumbDownAlt id="gray" sx={{ color: "gray", mx: 1 }} />
//         );
//     }
//     return (
//         <div className="row mt-2">
//             <div className="col">
//                 <ChatBubbleOutline sx={{ mx: 1 }} />
//                 {tuit.stats && tuit.stats.replies}
//             </div>
//             <div className="col">
//                 <Repeat sx={{ mx: 1 }} />
//                 {tuit.stats && tuit.stats.retuits}
//             </div>
//             <div className="col">
//         <span onClick={() => likeTuit(tuit)}>
//           {likeValueDisplayLogic}
//
//             {tuit.stats && tuit.stats.likes}
//         </span>
//             </div>
//             <div className="col">
//         <span onClick={() => dislikeTuit(tuit)}>
//           {dislikeValueDisplayLogic}
//             {tuit.stats && tuit.stats.dislikes}
//         </span>
//             </div>
//             <div className="col">
//                 <Inbox sx={{ mx: 1 }} />
//             </div>
//         </div>
//     );
// };
// export default TuitStats;
// import React from "react";
//
// const TuitStats = ({tuit, likeTuit,  dislikeTuit}) => {
//     return (
//         <div className="row">
//             ...
//             <div className="col">
//         <span onClick={() => likeTuit(tuit)}>
//         {
//             tuit.stats.likes > 0 &&
//             <i className="fas fa-heart"
//                style={{color: 'red'}}></i>
//         }
//             {
//                 tuit.stats.likes <= 0 &&
//                 <i className="far fa-heart"></i>
//             }
//             {tuit.stats && tuit.stats.likes}
//         </span>
//                 <span onClick={() => dislikeTuit(tuit)}>
//         {
//             tuit.stats.likes > 0 &&
//             <i className="fas fa-heart"
//                style={{color: 'red'}}></i>
//         }
//                     {
//                         tuit.stats.likes <= 0 &&
//                         <i className="far fa-heart"></i>
//                     }
//                     {tuit.stats && tuit.stats.likes}
//         </span>
//             </div>
//             ...
//         </div>
//     );
// }
// export default TuitStats
//
//
// // export default class TuitStats extends React.Component {
// //   constructor(props) {
// //     super(props);
// //   }
// //   render() {
// //     return (
// //       <div className="row mt-2">
// //         <div className="col">
// //           <i className="far fa-message me-1"></i>
// //           {this.props.tuit.stats && this.props.tuit.stats.replies}
// //         </div>
// //         <div className="col">
// //           <i className="far fa-retweet me-1"></i>
// //           {this.props.tuit.stats && this.props.tuit.stats.retuits}
// //         </div>
// //         <div className="col">
// //           <i className="far fa-heart me-1"></i>
// //           {this.props.tuit.stats && this.props.tuit.stats.likes}
// //         </div>
// //         <div className="col">
// //           <i className="far fa-inbox-out"></i>
// //         </div>
// //       </div>
// //     );
// //   }
// // }