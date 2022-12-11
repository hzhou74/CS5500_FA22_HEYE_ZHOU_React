import React, {useState,useEffect} from "react";
import * as LikeService from '../../services/likes-service';
import * as DislikeService from '../../services/dislikes-service';
const TuitStats = ({ tuit, currentUser, index, deleteBookmark, displayComment, commentCount }) => {
    // let likeValueDisplayLogic;

    // if (tuit.stats && tuit.stats.likes) {
    //     if (tuit.stats.likes > 0) {
    //         // likeValueDisplayLogic = <FavoriteIcon sx={{ color: "red" }} />;
    //     }
    // } else if (tuit.stats && tuit.stats.likes <= 0) {
    //     // likeValueDisplayLogic = <FavoriteIcon sx={{ color: "gray" }} />;
    // }

    const [isTuitLiked, setIsTuitLiked] = useState(false);
    const [isTuitDisliked, setIsTuitDisliked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);


    const likeTheTuit = async ()=>{
        const result= await LikeService.createLike(currentUser._id,tuit._id);
        console.log('after like creation: '+JSON.stringify(result));
    }

    const dislikeTheTuit = async ()=>{
        const result= await DislikeService.createDislike(currentUser._id,tuit._id);
        console.log('after like creation: '+JSON.stringify(result));
    }


    const deleteTheTuit2 = async ()=>{
        const result= await DislikeService.deleteDisLike(currentUser._id,tuit._id);
        console.log('after delete creation: '+JSON.stringify(result));

    }

    const deleteTheTuit = async ()=>{
        const result= await LikeService.deleteLike(currentUser._id,tuit._id);
        console.log('after delete creation: '+JSON.stringify(result));

    }

    const likeTuit = () => {

        if(!isTuitLiked){
            likeTheTuit();
            setIsTuitLiked(true);
            setLikeCount((prevCount)=>prevCount+1);
            setDislikeCount((prevCount)=>prevCount-1);
        }else {
            deleteTheTuit()
            setIsTuitLiked(false);
            setLikeCount((prevCount)=>prevCount-1);
            setDislikeCount((prevCount)=>prevCount+1);
        }
    }

    const dislikeTuit = () => {

        if(!isTuitDisliked){
            dislikeTheTuit();
            setIsTuitDisliked(true);
            setDislikeCount((prevCount)=>prevCount+1);
            setLikeCount((prevCount)=>prevCount-1);
        }else {
            deleteTheTuit2()
            setIsTuitDisliked(false);
            setDislikeCount((prevCount)=>prevCount-1);
            setLikeCount((prevCount)=>prevCount+1);
        }
    }

    useEffect(() => {

        const findDislikeCountAndIsTuitDisliked = async () =>{

            const dislikedData= await DislikeService.findUsersThatDisLikeTheTuitByTuitId(tuit._id);
            setDislikeCount(dislikedData.length);
            for(let i=0;i<dislikedData.length;i++){
                if(dislikedData[i].dislikedBy._id===currentUser._id){
                    setIsTuitDisliked(true);
                    break;
                }
            }
        }
        findDislikeCountAndIsTuitDisliked();
    }, [])

    useEffect(() => {

        const findLikeCountAndIsTuitLiked = async () =>{

            const likedData= await LikeService.findUsersThatLikeTheTuitByTuitId(tuit._id);
            setLikeCount(likedData.length);
            for(let i=0;i<likedData.length;i++){
                if(likedData[i].likedBy._id===currentUser._id){
                    setIsTuitLiked(true);
                    break;
                }
            }
        }

        findLikeCountAndIsTuitLiked();
    }, [])


    return (
        <div className="row mt-2">
            {isTuitLiked&&
                <div className="col">
                    <i className='fa-solid fa-thumbs-up' style={{color:'red'}} onClick={()=>likeTuit()} ></i>
                    {likeCount}
                </div>
            }
            {!isTuitLiked&&<div className="col">
                <i className='fa-solid fa-thumbs-up' onClick={()=>likeTuit()}></i>
                {likeCount}
            </div>
            }

            {isTuitDisliked&&
                <div className="col">
                    <i className='fa-solid fa-thumbs-down' style={{color:'blue'}} onClick={()=>dislikeTuit()} ></i>
                    {dislikeCount}
                </div>
            }
            {!isTuitDisliked&&<div className="col">
                <i className='fa-solid fa-thumbs-down' onClick={()=>dislikeTuit()}></i>
                {dislikeCount}
            </div>
            }

        </div>
    );
};
export default TuitStats;